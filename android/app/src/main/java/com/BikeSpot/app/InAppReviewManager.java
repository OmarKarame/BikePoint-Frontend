package com.bikespot.app;

import android.app.Activity;
import android.util.Log;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.module.annotations.ReactModule;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

@ReactModule(name = InAppReviewModule.NAME)
public class InAppReviewModule extends ReactContextBaseJavaModule {
    public static final String NAME = "InAppReview";

    private final ReactApplicationContext reactContext;

    public InAppReviewModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void rate(final Callback callback) {
        final ReviewManager manager = ReviewManagerFactory.create(this.reactContext);
        Task<ReviewInfo> request = manager.requestReviewFlow();
        request.addOnCompleteListener(new OnCompleteListener<ReviewInfo>() {
            @Override
            public void onComplete(@NonNull final Task<ReviewInfo> requestTask) {
                if (requestTask.isSuccessful()) {
                    ReviewInfo reviewInfo = requestTask.getResult();
                    Activity activity = getCurrentActivity();
                    if (activity == null) {
                        callback.invoke(false, "getCurrentActivity() unsuccessful");
                        return;
                    }
                    Task<Void> flow = manager.launchReviewFlow(activity, reviewInfo);
                    flow.addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> flowTask) {
                            if (requestTask.isSuccessful()) {
                                callback.invoke(true);
                            } else {
                                callback.invoke(false, "launchReviewFlow() unsuccessful");
                            }
                        }
                    });
                } else {
                    callback.invoke(false, "requestReviewFlow() unsuccessful");
                }
            }
        });
    }
}
