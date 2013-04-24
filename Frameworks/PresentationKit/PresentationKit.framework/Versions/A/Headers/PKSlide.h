@class PKSection;
@class PKFlow;

extern NSString* const kHiddenValue;
extern NSString* const kActiveValue;
extern NSString* const kInactiveValue;

@interface PKSlide : NSManagedObject

@property (strong, nonatomic) NSString* title;
@property (strong, nonatomic) NSString* brand;
@property (strong, nonatomic) NSString* contentLocation;
@property (strong, nonatomic) NSString* message;
@property (strong, nonatomic) NSURL* thumbnailImageLocation;
@property (nonatomic) BOOL isMandatory;
@property (nonatomic) BOOL delayDisplay;
@property (strong, nonatomic) NSSet* requiredCompanionSlides;
@property (strong, nonatomic) NSString* assetID;
@property (strong, nonatomic) NSSet* dependentAssets;
@property (strong, nonatomic) PKSection* section;
@property (strong, nonatomic) NSString* subSection;
@property (strong, nonatomic) NSString* status;
@property (strong, nonatomic) NSString* menuVisibility;
@property (nonatomic, retain) NSOrderedSet* flowSlides;
@property (nonatomic, strong) NSOrderedSet* events;

@property (strong, nonatomic) UIImage* thumbnailImage;
@property (strong, nonatomic) PKSlide* topNeighbor;
@property (strong, nonatomic) PKSlide* bottomNeighbor;
@property (strong, nonatomic, readonly) NSOrderedSet* companionSlides;

@property (nonatomic) BOOL isDivergent;

- (NSString*) path;
- (BOOL) isDivergentFromFlow:(PKFlow*)flow;
- (NSString*) identifier;

@end