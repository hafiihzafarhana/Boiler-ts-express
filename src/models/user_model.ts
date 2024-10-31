import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

import { IUserDocument } from '@infrastructure/interfaces/user_interface';
import { sqlz } from '@root/database';

import { TokenModel } from './token_model';

const SALT_ROUND = 10;

interface UserModelInstance extends Model {
  method: {
    checkPassword: (password: string, hashedPassword: string) => Promise<boolean>;
    hashPassword: (password: string) => Promise<string>;
  };
}

type UserCreationAttributes = Optional<IUserDocument, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

const UserModel: ModelDefined<IUserDocument, UserCreationAttributes> & UserModelInstance = sqlz.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Pastikan email unik
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Pastikan username unik
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        unique: true,
        fields: ['username']
      }
    ]
  }
) as ModelDefined<IUserDocument, UserCreationAttributes> & UserModelInstance;

// Hook untuk meng-hash password sebelum pengguna dibuat
UserModel.addHook('beforeCreate', async (auth: Model) => {
  const hashedPassword: string = await bcrypt.hash(auth.dataValues.password as string, SALT_ROUND);
  auth.dataValues.password = hashedPassword;
});

// Metode untuk memeriksa dan meng-hash password
UserModel.method = {
  checkPassword: async function (password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  },
  hashPassword: async function (password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUND);
  }
};

// Relasi dengan TokenModel
UserModel.hasOne(TokenModel, {
  foreignKey: 'user_id', // Kunci asing di TokenModel
  sourceKey: 'id', // Kunci sumber di UserModel
  as: 'token' // Alias untuk akses token dari user
});

TokenModel.belongsTo(UserModel, {
  foreignKey: 'user_id', // Kunci asing di TokenModel
  targetKey: 'id', // Kunci target di UserModel
  as: 'user' // Alias untuk akses user dari token
});

// Ekspor UserModel
export { UserModel };
