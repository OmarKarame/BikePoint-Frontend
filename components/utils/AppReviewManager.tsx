import {Platform, NativeModules} from 'react-native';

export class AppReviewManager {

    public static rate = (callback:(response :any) => void) => {
        const { InAppReview } = NativeModules 

        if(Platform.OS === 'ios'){
            InAppReview.rate((response, error) => {
                callback({response, error});
            }); 
        }
        else if(Platform.OS === 'android'){
             InAppReview.rate((response, error) => {
              callback({response, error})
            })
        }
    }

}

// https://medium.com/@deepanshujain_33606/in-app-review-in-react-native-android-ios-18f06b95ae58
