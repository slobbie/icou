// import React from 'react';
// import styled from 'styled-components/native';

// const SettingScreen = () => {
//   RNCalendarEvents.requestPermissions().then((result) => {
//     if (result === 'authorized') {
//       // 캘린더 이벤트를 가져옵니다.
//       const today = new Date();
//       const todayString = today.toISOString().split('T')[0];

//       RNCalendarEvents.fetchAllEvents(todayString, todayString).then(
//         (result) => {
//           console.log('결과', result);
//           Alert.alert(
//             'Calendars',
//             result.reduce((acc, cal) => {
//               acc.push(cal.title);
//               return acc;
//             }, []).join('\n'),
//           );
//         },
//         (error) => {
//           console.error(error);
//         },
//       );
//     } else {
//       console.log('Permission denied');
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
// }}
//   return (
//     <SafeView>
//       <Text>DashBoard</Text>
//     </SafeView>
//   );
// };

// export default SettingScreen;

// const SafeView = styled.SafeAreaView``;

// const Text = styled.Text``;


import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  Platform,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import RNCalendarEvents from 'react-native-calendar-events';

const SettingScreen = () => {
  // const today = new Date();
  // const todayString = today.toISOString().split('T')[0];
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Read/Write Auth</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="Request auth"
                  onPress={() => {
                    RNCalendarEvents.requestPermissions().then(
                      (result) => {
                        Alert.alert('Auth requested', result);
                      },
                      (result) => {
                        console.error(result);
                      },
                    );
                  }}
                />
                <Text>{'\n'}</Text>
                <Button
                  title="Check auth"
                  onPress={() => {
                    RNCalendarEvents.checkPermissions().then(
                      (result) => {
                        Alert.alert('Auth check', result);
                      },
                      (result) => {
                        console.error(result);
                      },
                    );
                  }}
                />
              </Text>
            </View>
            {Platform.OS === 'android' && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Read-Only Auth</Text>
                <Text style={styles.sectionDescription}>
                  <Button
                    title="Request auth"
                    onPress={() => {
                      RNCalendarEvents.requestPermissions(true).then(
                        (result) => {
                          Alert.alert('Read-only Auth requested', result);
                        },
                        (result) => {
                          console.error(result);
                        },
                      );
                    }}
                  />
                  <Text>{'\n'}</Text>
                  <Button
                    title="Check auth"
                    onPress={() => {
                      RNCalendarEvents.checkPermissions(true).then(
                        (result) => {
                          Alert.alert('Read-only Auth check', result);
                        },
                        (result) => {
                          console.error(result);
                        },
                      );
                    }}
                  />
                </Text>
              </View>
            )}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Calendars</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="Find calendars"
                  onPress={() => {
                    RNCalendarEvents.requestPermissions().then((result) => {
                      if (result === 'authorized') {
                        // 캘린더 이벤트를 가져옵니다.
                        const today = new Date();
                        const todayString = today.toISOString().split('T')[0];

                        RNCalendarEvents.fetchAllEvents(todayString, todayString).then(
                          (result) => {
                            console.log('결과', result);
                            Alert.alert(
                              'Calendars',
                              result.reduce((acc, cal) => {
                                acc.push(cal.title);
                                return acc;
                              }, []).join('\n'),
                            );
                          },
                          (error) => {
                            console.error(error);
                          },
                        );
                      } else {
                        console.log('Permission denied');
                      }
                    }).catch((error) => {
                      console.error(error);
                    });
                  }}
                />
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default SettingScreen;
