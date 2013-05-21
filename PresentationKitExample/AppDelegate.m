#import "AppDelegate.h"
#import <PresentationKit/PKPackageURLProtocol.h>


@interface AppDelegate () <PKPresentationViewControllerDelegate>

@end


@implementation AppDelegate

- (BOOL) application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    NSError* error = nil;
    if (![PKPackage loadPackagesAtPath: [self contentPackPath]
                                 error: &error])
    {
        NSLog(@"%@", error);
    }
    

    
    
    PKPresentation* presentation = [PKPresentation presentationWithName:@"CN_Symbicort_P_Main"];
    
    NSAssert(presentation != nil, @"Why is there no presentation named 'CN_Symbicort_P_Main'?");

    
    PKPresentationViewController* controller = (PKPresentationViewController*)[[self window] rootViewController];
    [controller setFlow:[presentation defaultFlow]];
    [controller setDelegate:self];
    
    [[self window] makeKeyAndVisible];
    return YES;
}

- (void) applicationDidEnterBackground:(UIApplication*)application
{
}

- (void) applicationDidBecomeActive:(UIApplication *)application
{
}

- (void) applicationWillTerminate:(UIApplication*)application
{
}

- (void) presentationViewControllerDidRequestExit:(PKPresentationViewController *)controller
{
    // Nothing
}

- (NSURL*) presentationViewController:(PKPresentationViewController*)slidePresenter willLoadContentFromURL:(NSURL*)url
{
    if ([[url scheme] isEqualToString:@"package"]) {
        return [NSURL fileURLWithPath:[PKPackageURLProtocol pathToResourceForPackageURL:url]];
    } else {
        return url;
    }
}

#pragma mark - Paths


- (NSString*) contentPackPath
{
    return [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"Content"];
}

- (NSURL*) applicationDocumentsDirectory
{
    return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
}

@end
