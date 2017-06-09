//
//  AppConfiguration.m
//  SantimentMobile
//
//  Created by Igor Matyushkin on 10.06.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "AppConfiguration.h"

@implementation AppConfiguration

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  const NSDictionary *santimentSettings = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"Santiment"];
  const NSString* buildConfiguration = santimentSettings[@"BuildConfiguration"];
  
  return @{
           @"buildConfiguration": buildConfiguration
           };
}

@end
