import StackNavigation from '@navigation/StackNavigation';
import React, { useCallback, useEffect } from 'react';
import {Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ThemeProvider} from 'styled-components/native';
import appTheme from '@common/styles/appTheme';
import GlobalPopup from '@common/components/popup/useGlobalPopup';
import usePermissions from '@common/hooks/usePermissions';
import GlobalPopupController from 'main/common/components/popup/GlobalPopupController';
import { ios } from 'main/common/hooks/usePlatform';

const App = () => {
  const {requestPermissions} = usePermissions()

  /** 앱권한 요청 */
  const getRequestPermissions = useCallback(() => {
    let checkPermissions = ['calendar_READ', 'calendar_WRITE'];


    requestPermissions(
      ios ? ['calendar_READ'] : checkPermissions
      ,
      async () => {
        //성공
      },
      async () => {
        //실패
        GlobalPopupController.showAlert('alert', '캘린더 권한을 얻지 못하였습니다.', ()=>{
          getRequestPermissions()
        })
      }, true)
  }, [])

  useEffect(() => {
    getRequestPermissions()
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <StatusBar barStyle="light-content" />
        <StackNavigation />
        <GlobalPopup/>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
