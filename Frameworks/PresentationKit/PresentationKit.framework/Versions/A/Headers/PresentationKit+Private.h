
@interface PresentationKit : NSObject

@property (readonly, strong, nonatomic) NSPersistentStoreCoordinator* persistentStoreCoordinator;
@property (readonly, strong, nonatomic) NSManagedObjectContext* managedObjectContext;
@property (readonly, strong, nonatomic) NSManagedObjectModel* managedObjectModel;

+ (PresentationKit*) sharedInstance;
+ (NSManagedObjectContext*) distinctManagedObjectContext;

- (BOOL) saveManagedObjectContext:(NSManagedObjectContext*)context error:(NSError**)error;
- (BOOL) savePKManagedObjectContextWithError:(NSError**)error;

@end

extern NSString* const kCFBundlePackageTypeKey;
