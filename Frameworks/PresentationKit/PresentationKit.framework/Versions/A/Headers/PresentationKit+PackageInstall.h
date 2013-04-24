#import "PresentationKit+Private.h"

extern NSString* const kPackageDescriptionKey;
extern NSString* const kPresentationDependenciesKey;

extern NSString* const kPKPackageAssetTypeKey;
extern NSString* const kPKPackageLanguageKey;
extern NSString* const kPKPackageNameKey;
extern NSString* const kPKPackageTitleKey;
extern NSString* const kPKPackageExprationDateKey;
extern NSString* const kPKPackageDeploymentStatusKey;
extern NSString* const kPKPackageVersionKey;
extern NSString* const kPKPackageBrandNameKey;

@interface PresentationKit (PackageInstall)

+ (BOOL) installPresentationWithBundle:(NSBundle*)presentationBundle packageId:(NSString*)packageId size:(NSUInteger)sizeInBytes dependencies:(NSDictionary*)dependenciesByName briefcases:(NSDictionary*)briefcasesByName error:(NSError**)error;

@end
