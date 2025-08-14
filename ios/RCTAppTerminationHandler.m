//
//  RCTAppTerminationHandler.m
//  NewExpensify
//
//  Created by cosmicvulpes on 2025-08-15.
//

#import "RCTAppTerminationHandler.h"

@implementation RCTAppTerminationHandler

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getAppTerminatedGracefully:(RCTResponseSenderBlock)callback)
{
    BOOL appTerminatedGracefully = [[NSUserDefaults standardUserDefaults] boolForKey:@"appTerminatedGracefully"];
    
    // Clear the flag immediately after reading it
    [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"appTerminatedGracefully"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    callback(@[@(appTerminatedGracefully)]);
}

@end
