import React from 'react';
import { ReactComponent as Error } from '../../../assets/svg/monster.svg';
import AppLayout from '../../layouts/AppLayout';

export default () => {
  return (
    <AppLayout>
      <div className="error">
        <Error className="error__svg" />
      </div>
    </AppLayout>
  );
};
