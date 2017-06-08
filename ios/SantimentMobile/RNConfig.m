//
//  RNConfig.m
//  SantimentMobile
//
//  Created by Igor Matyushkin on 08.06.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNConfig.h"

RCT_EXPORT_MODULE();

@implementation RNConfig

- (NSDictionary *)constantsToExport
{
  NSString* buildEnvironment = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"BuildEnvironment"];
  
  return @{
           @"buildEnvironment": buildEnvironment
           };
}

@end
