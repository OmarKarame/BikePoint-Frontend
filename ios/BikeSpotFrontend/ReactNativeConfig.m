#import "ReactNativeConfig.h"
#import "GeneratedDotEnv.m"

@implementation ReactNativeConfig

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

- (NSDictionary *)constantsToExport {
  return (NSDictionary *)ENV;
}

@end
