
@class PKFlow;
@class PKSection;
@class PKSlide;
@class PKSlideModal;
@class PKPackage;


extern NSString* const kPresentationDeploymentStatusTraining;
extern NSString* const kPresentationDeploymentStatusReview;
extern NSString* const kPresentationDeploymentStatusDraft;
extern NSString* const kPresentationDeploymentStatusProduction;
extern NSString* const kPresentationDeploymentStatusCrossBrand;
extern NSString* const kPresentationDeploymentStatusAssessment;

extern NSString* const kPresentationDefaultFlowName;

@interface PKPresentation : NSManagedObject

+ (PKPresentation*) presentationWithName:(NSString*)name;
+ (NSPredicate*) excludeExpiredPresentationsPredicate;

@property (nonatomic, strong) NSDate* expirationDate;
@property (nonatomic, strong) NSString* title;
@property (nonatomic, strong) NSString* brand;
@property (nonatomic, strong) NSString* deploymentStatus;
@property (nonatomic, strong) NSString* language;
@property (nonatomic, strong) NSString* region;
@property (nonatomic, strong) NSString* contentKey;
@property (nonatomic, strong) NSString* summary;
@property (nonatomic, strong) NSString* pathToRoot;
@property (nonatomic, strong) NSOrderedSet* sections;
@property (nonatomic, strong) NSOrderedSet* flows;
@property (nonatomic, strong) NSOrderedSet* supplementalMediaItems;
@property (nonatomic, strong) NSOrderedSet* calls;
@property (nonatomic, strong) NSOrderedSet* slideModals;
@property (nonatomic, strong) NSOrderedSet* brands;

@property (nonatomic, readonly) NSString* coverFile;
@property (nonatomic, readonly) NSString* configFile;
@property (nonatomic, readonly) NSArray* alternateConfigFiles;

@property (nonatomic, readonly) NSDictionary* menuDescriptor;
@property (nonatomic, readonly) NSBundle* menuBundle;

@property (nonatomic, readonly) NSUInteger supportedOrientations;

@property (nonatomic, strong) PKPackage* package;
@property (nonatomic, readonly) PKFlow* defaultFlow;
@property (nonatomic, readonly) UIImage* thumbnailImage;
@property (nonatomic) BOOL screenLockEnabled;
@property (nonatomic) BOOL drawingEnabled;
@property (nonatomic) BOOL exitOnDoubleTap;

- (NSString*) pathToConfigurationFileDirectory;
- (NSString*) pathToHtmlDirectory;
- (NSString*) pathToConfigurationFile;
- (NSArray*) configurationFiles;

- (PKSection*) sectionWithName:(NSString*)name;
- (PKSlide*) slideWithIdentifier:(NSString*)identifier;
- (PKSlideModal*) slideModalWithIdentifier:(NSString*)identifier;
- (NSArray*) slides;
- (PKFlow*) flowWithName:(NSString*)name;

- (void) setPersistenValue:(NSString*)value forKey:(NSString*)key;
- (NSString*) persistentValueForKey:(NSString*)key;
- (BOOL) isCrossBrand;

+ (NSArray*) allIDs;

@end

@interface PKPresentation (PrimitiveAccessors)

- (NSString*)primitivePathToRoot;
- (void)setPrimitivePathToRoot:(NSString*)newPathToRoot;

@end

@interface PKPresentation (CoreDataGeneratedAccessors)

- (void)insertObject:(PKFlow *)value inFlowsAtIndex:(NSUInteger)idx;
- (void)removeObjectFromFlowsAtIndex:(NSUInteger)idx;
- (void)insertFlows:(NSArray *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeFlowsAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInFlowsAtIndex:(NSUInteger)idx withObject:(PKFlow *)value;
- (void)replaceFlowsAtIndexes:(NSIndexSet *)indexes withSlides:(NSArray *)values;
- (void)addFlowsObject:(PKFlow *)value;
- (void)removeFlowsObject:(PKFlow *)value;
- (void)addFlows:(NSOrderedSet *)values;
- (void)removeFlows:(NSOrderedSet *)values;

- (void) addSectionsObject:(PKSection*)value;
- (BOOL) isBuiltIn;

@end

@interface NSManagedObjectContext (PKPresentation)

- (NSManagedObjectObservable*) presentationObservable;
- (NSArray*) findPresentationsWithBrandName:(NSString*)brandName;
- (NSUInteger) numberOfPresentationsWithPredicate:(NSPredicate*)predicate error:(NSError**)error;

@end
