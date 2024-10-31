import { DataTypes, ModelDefined, Optional } from 'sequelize';

import { ITokenDocument } from '@infrastructure/interfaces/token_interface';
import { sqlz } from '@root/database';

type TokenCreationAttributes = Optional<ITokenDocument, 'createdAt' | 'updatedAt' | 'deletedAt'>;

const TokenModel: ModelDefined<ITokenDocument, TokenCreationAttributes> = sqlz.define(
  'tokens',
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    acc_token: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    ref_token: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['acc_token']
      }
    ]
  }
) as ModelDefined<ITokenDocument, TokenCreationAttributes>;

export { TokenModel };
