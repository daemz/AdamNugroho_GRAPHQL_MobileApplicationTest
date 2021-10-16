jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
}));

jest.mock('react-native-size-matters', () => ({
  moderateScale: jest.fn(),
}));

jest.mock('graphql-hooks', () => ({
  useQuery: jest.fn(),
  useManualQuery: jest.fn(),
}));

jest.mock('react-native-actions-sheet', () => ({
  ActionSheet: jest.fn(),
}));

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  // useNavigationParam: jest.fn(jest.requireActual(
  //  '@react-navigation/native'
  // ).useNavigationParam),
  useIsFocused: jest.fn(),
 }));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
 }));

jest.mock('react-native-vector-icons', () => ({
  Ionicons: jest.fn(),
  Feather: jest.fn(),
  Entypo: jest.fn(),
  FontAwesome5: jest.fn(),
  AntDesign: jest.fn(),
 }));

