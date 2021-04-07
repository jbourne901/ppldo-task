import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Bookmark value */
  Bookmark: any;
  /** The DateTime scalar type represents date time strings complying to ISO-8601. */
  DateTime: any;
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any;
  /** Grade value */
  Grade: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** field for sorting (https://github.com/truongkhanhduy95/Lexorank) */
  LexoRank: any;
  /** The `LongInt` scalar type represents non-fractional signed whole numeric values. LongInt can represent values between -(2^53 - 1) and 2^53 - 1.  */
  LongInt: any;
  /** Always null */
  Null: any;
  /** E.164 phone format (without +) */
  PhoneNumber: any;
};

/** Грань активный пользователь/чат */
export type ActiveChatMember = {
  __typename?: 'ActiveChatMember';
  /** чат */
  chat: IChat;
  /** пользователь */
  user: ActiveUser;
};

/** активный пользователь */
export type ActiveUser = IUser & {
  __typename?: 'ActiveUser';
  id: Scalars['ID'];
  /** флаг того, что это текущий пользователь */
  is_my: Scalars['Boolean'];
  /** телефон */
  phone?: Maybe<Scalars['PhoneNumber']>;
  /**
   * является ли пользователь "оператором",
   * оператору отправляются сервисные сообщения,
   * также оператор поумолчанию добавляется к пользователям в контакты
   */
  is_operator: Scalars['Boolean'];
  /** дата регистрации */
  join_date: Scalars['DateTime'];
  /** время когда пользователь был последний раз онлайн (окончание предыдущей сессии) */
  last_seen: Scalars['DateTime'];
  /** состояние пользователя */
  online: Scalars['Boolean'];
  /** профиль */
  profile: UserProfile;
  /** аватар пользователя */
  avatar?: Maybe<UserImage>;
  /** Пользователь в контактах у текущего */
  is_contact: Scalars['Boolean'];
  /** отзывы, оставленные данному пользователю. null, если отзывов нет */
  reviews: UserReviewsConnection;
};


/** активный пользователь */
export type ActiveUserReviewsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

export type AddUserToChatResult = {
  __typename?: 'AddUserToChatResult';
  /** созданное сервисное сообщение */
  createdNotificationMessage: IChatNootificationMessageEdge;
  /** вновь созданная грань пользователь/чат */
  createdChatUserEdge: ChatMember;
};

/** Прикрепленый файл */
export type AttachedFile = IFile & {
  __typename?: 'AttachedFile';
  /** чат, к которому прикреплен файл */
  attached_to: IChat;
  /** тип файла */
  type: FileType;
  /** id файла */
  id: Scalars['ID'];
  /** ключ на s3 */
  key: Scalars['String'];
  /** дата загрузки файла */
  timestamp: Scalars['DateTime'];
  /** url оригинала */
  url: Scalars['String'];
  /** размер файла */
  content_length: Scalars['LongInt'];
  /** mime-тип */
  content_type: Scalars['String'];
  /** имя файла */
  file_name: Scalars['String'];
};

export type AttachedFileConnection = {
  __typename?: 'AttachedFileConnection';
  pageInfo: PageInfo;
  edges: Array<AttachedFileEdge>;
};

export type AttachedFileEdge = {
  __typename?: 'AttachedFileEdge';
  node: AttachedFile;
  cursor: Scalars['String'];
};

/** токен аутентификации */
export type AuthToken = {
  __typename?: 'AuthToken';
  /** количество секунд жизни токена */
  expiration: Scalars['Int'];
  /** окончание валидности */
  expiration_date: Scalars['DateTime'];
  /** токен */
  token: Scalars['String'];
};


/** Чат */
export type Chat = IChat & {
  __typename?: 'Chat';
  id: Scalars['ID'];
  /** статус прочтенности/доставленности */
  check_status: CheckStatus;
  /** сохраненный черновик. интерпертировать пустую строку как отсутствие черновика */
  draft: Scalars['String'];
  /** дата создания чата */
  created_at: Scalars['DateTime'];
  /** чат скрыт */
  hidden?: Maybe<Scalars['Boolean']>;
  /** индекс сортировки *поле индивидуально для пользователя* */
  rank?: Maybe<Scalars['LexoRank']>;
  /** *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*  Уровень назойливости событий чата */
  notification: ChatNotificationState;
  /**
   * *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*  Ограничить состояние notification датой, например - отлючить звук до...
   * Если устанавливаетсу notification_disabled_till,
   * то при наступлении указанного времени,
   * состояние notification снова возвращается в ON.
   * При наступлении указанного времени,
   * придет сабскрипшн chatUpdated,
   * где будет notification = 'ON', notification_disabled_till = null .
   */
  notification_disabled_till?: Maybe<Scalars['DateTime']>;
  /** состояние чата */
  state: ChatState;
  /** описание чата */
  caption: Scalars['String'];
  /** заголовок чата */
  title: Scalars['String'];
  /** файлы, прикрепленные к данному чату, но еще не отправленные */
  attached_files: AttachedFileConnection;
  /** избранные сообщения данного чата */
  favorite_messages: ChatFavoriteMessagesConnection;
  /** файлы, прикрепленные к сообщениям данного чата */
  files: MessageFileConnection;
  /** ссылки в сообщениях */
  links: LinkInfoConnection;
  /** сообщения чата */
  messages: IChatMessageConnection;
  /** дела, прикрепленные к чату */
  todos: TodoConnection;
  /** пользователи в чате */
  users: IChatUserConnection;
  /** изображение чата */
  image?: Maybe<ChatImage>;
  /** задача, свзанная с данным чатом */
  issue?: Maybe<Issue>;
  /** пользователь-создатель чата */
  creator: RegisteredUser;
};


/** Чат */
export type ChatAttached_FilesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Чат */
export type ChatFavorite_MessagesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Чат */
export type ChatFilesArgs = {
  filter?: Maybe<ChatFilesFilterInput>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  around?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Чат */
export type ChatLinksArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Чат */
export type ChatMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  around?: Maybe<Scalars['ID']>;
  around_bookmark?: Maybe<Scalars['Bookmark']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Чат */
export type ChatTodosArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Чат */
export type ChatUsersArgs = {
  state_filter?: Maybe<ChatUsersStateFilter>;
};

export type ChatFavoriteMessagesConnection = {
  __typename?: 'ChatFavoriteMessagesConnection';
  pageInfo: PageInfo;
  edges: Array<IMessageEdge>;
  /** # Количество избранных сообщений */
  count: Scalars['Int'];
};

export type ChatFilesFilterInput = {
  /** тип файла */
  type?: Maybe<FileType>;
  /** исключить по mime */
  exclude_mime?: Maybe<Array<Scalars['String']>>;
  /** включить по mime */
  include_mime?: Maybe<Array<Scalars['String']>>;
};

/** Коннекшн чат/пересланное сообщения */
export type ChatForwardMessageConnection = {
  __typename?: 'ChatForwardMessageConnection';
  pageInfo: PageInfo;
  edges: Array<ChatFrowardMessageEdge>;
};

/** Грань чат/пересланное сообщение */
export type ChatFrowardMessageEdge = {
  __typename?: 'ChatFrowardMessageEdge';
  node: ForwardMessage;
  cursor: Scalars['String'];
  /**
   * букмарк, используется для учета прочтенности доставленности
   * см. CheckStatus
   * для bookmark гарантируется лексикографическая отсортированность
   */
  bookmark: Scalars['Bookmark'];
};

/** Изображение чата */
export type ChatImage = IFile & {
  __typename?: 'ChatImage';
  /** выбранная пользователем зона изображения */
  area?: Maybe<ImageArea>;
  /** id файла */
  id: Scalars['ID'];
  /** ключ на s3 */
  key: Scalars['String'];
  /** дата загрузки файла */
  timestamp: Scalars['DateTime'];
  /** url оригинала */
  url: Scalars['String'];
  /** размер файла */
  content_length: Scalars['LongInt'];
  /** mime-тип */
  content_type: Scalars['String'];
};

export type ChatImageUploadedResult = {
  __typename?: 'ChatImageUploadedResult';
  /** идентификатор чата, для которого загружено изображение */
  chat_id: Scalars['ID'];
  /** аватар */
  image: ChatImage;
};

/** Грань пользователь/чат */
export type ChatMember = {
  __typename?: 'ChatMember';
  /** чат */
  chat: IChat;
  /** пользователь */
  user: User;
};

/** уровень назойливости событий чата */
export enum ChatNotificationState {
  /** не создают звуков в клиенте, не создают звуков в пуш уведомлении */
  Mute = 'MUTE',
  /** не создают звуков в клиенте, не создают пуш уведомлений */
  Off = 'OFF',
  /** звук в клиенту включен, приходят пуши со звуком */
  On = 'ON'
}

/** статус вашего участия в чате */
export enum ChatState {
  /** активен */
  Active = 'ACTIVE',
  /** создатель завершил чат */
  Closed = 'CLOSED',
  /** вы покинули чат */
  Leaved = 'LEAVED',
  /** вы удалены из чата */
  Deleted = 'DELETED'
}

/** фильтр по статусу участника чата */
export enum ChatUsersStateFilter {
  /** только активные участники */
  Active = 'ACTIVE',
  /** все участники */
  All = 'ALL'
}

/** Фильтр по списку чатов */
export type ChatsFilterInput = {
  /** фильтровать по идентификаторам чатов */
  ids?: Maybe<Array<Scalars['ID']>>;
  /**
   * фильтровать по активности, если передан true, будут выбраны активные чаты,
   * если false, неактивные
   */
  active?: Maybe<Scalars['Boolean']>;
  /** фильтр по флагу скрытия */
  hidden?: Maybe<Scalars['Boolean']>;
  /** исключить личные чаты */
  exclude_pm?: Maybe<Scalars['Boolean']>;
  /** последнее сообщение создано после */
  last_message_after?: Maybe<Scalars['DateTime']>;
  /** последнее сообщение создано до */
  last_message_before?: Maybe<Scalars['DateTime']>;
};

/** сущность, содержащая информацию о прочтенности сообщений */
export type CheckStatus = {
  __typename?: 'CheckStatus';
  /** чат */
  chat: IChat;
  /** количество непрочитанных сообщений в чате */
  unread_messages_count: Scalars['Int'];
  /**
   * букмарк последнего сообщения, прочитанного другими пользователями
   *
   * считать прочитанными сообщение при условии strcmp(IChatMessageEdge.bookmark, last_viewed) <= 0
   */
  last_viewed: Scalars['Bookmark'];
  /**
   * букмарк последнего прочитанное мною сообщение,
   * служит для отображения новых сообщений при загрузке чата
   *
   * считать прочитанными сообщение при условии strcmp(IChatMessageEdge.bookmark, my_last_viewed) <= 0
   */
  my_last_viewed: Scalars['Bookmark'];
  /**
   * пользователь был упомянут после позиции букмарка
   * (был упомянут после последнего прочтеного сообщения)
   */
  mentioned: Scalars['Boolean'];
};

export type ContactUsersConnection = {
  __typename?: 'ContactUsersConnection';
  pageInfo: PageInfo;
  edges: Array<ContactUsersEdge>;
};

export type ContactUsersEdge = {
  __typename?: 'ContactUsersEdge';
  node: User;
  cursor: Scalars['String'];
};

/** Измененные сущности мутации createChat */
export type CreateChatResult = {
  __typename?: 'CreateChatResult';
  /** вновь созданный чат */
  createdChat: Chat;
  /** вновь созданная задача */
  createdIssue?: Maybe<Issue>;
};

export type CreateReviewInput = {
  id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  grades: GradesInput;
};


/** склонения */
export type Declention = {
  __typename?: 'Declention';
  /** именительный (кто? что?) */
  nominative?: Maybe<Scalars['String']>;
  /** родительный (кого? чего?) */
  genitive?: Maybe<Scalars['String']>;
  /** дательный (кому? чему?) */
  dative?: Maybe<Scalars['String']>;
  /** винительный (кого? что?) */
  accusative?: Maybe<Scalars['String']>;
  /** творительный (кем? чем?) */
  instrumental?: Maybe<Scalars['String']>;
  /** предложный (о ком? о чем?) */
  prepositional?: Maybe<Scalars['String']>;
};

export type DeletedMessage = {
  __typename?: 'DeletedMessage';
  /** поле-заглушка - graphql не допускает типы без полей */
  _?: Maybe<Scalars['Boolean']>;
};

export type DraftSetResult = {
  __typename?: 'DraftSetResult';
  chat_id: Scalars['ID'];
  draft: Scalars['String'];
};


/** возможные варианты ошибок */
export enum ErrorType {
  ValidationError = 'ValidationError',
  LimitRequiredError = 'LimitRequiredError',
  BadRequestError = 'BadRequestError',
  UnauthorizedError = 'UnauthorizedError',
  ForbiddenError = 'ForbiddenError',
  NotFoundError = 'NotFoundError',
  UnprocessableEntityError = 'UnprocessableEntityError',
  TooManyRequestsError = 'TooManyRequestsError',
  ClientClosedRequestError = 'ClientClosedRequestError',
  TooManyInvitesError = 'TooManyInvitesError',
  TooManyInvitesPerContactError = 'TooManyInvitesPerContactError',
  UserWithSameEmailExists = 'UserWithSameEmailExists',
  UserWithSamePhoneExists = 'UserWithSamePhoneExists',
  MembersLimitExceded = 'MembersLimitExceded',
  BadCredentials = 'BAD_CREDENTIALS',
  UserInactive = 'USER_INACTIVE',
  TooManyAttempts = 'TOO_MANY_ATTEMPTS'
}

/** сообщение-файл */
export type FileMessage = IMessage & {
  __typename?: 'FileMessage';
  id: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  /** глобальный порядок сообщения 53-bits, сравнивая данные числа легко определить в каком порядке они были созданы аналог twitter snowflake */
  order: Scalars['LongInt'];
  /**
   * Флаг того, что сообщение в избранных.
   * Гарантируется, что будет установлено в запросе сообщений чата,
   * в остальных случаях не гарантируется.
   */
  is_favorite?: Maybe<Scalars['Boolean']>;
  /** флаг того, что сообщение отправил текущий пользователь */
  is_my: Scalars['Boolean'];
  /** чат, в который отправили сообщение, может быть null в процитированных сообщениях */
  chat: IChat;
  /** пользователь, отправивший сообщение */
  user: RegisteredUser;
  /** идентификаторы пользователей, прочитавших сообщение */
  viewed_by: Array<Scalars['ID']>;
  /** файлы, прикрепленные к данной задаче, но еще не отправленные */
  file: MessageFile;
  quoted_message?: Maybe<QuotedMessage>;
};

/** тип файла */
export enum FileType {
  /** документ */
  Document = 'DOCUMENT',
  /** изображение */
  Image = 'IMAGE'
}

/** пересланное сообщение */
export type ForwardMessage = IMessage & {
  __typename?: 'ForwardMessage';
  id: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  /** глобальный порядок сообщения 53-bits, сравнивая данные числа легко определить в каком порядке они были созданы аналог twitter snowflake */
  order: Scalars['LongInt'];
  /**
   * Флаг того, что сообщение в избранных.
   * Гарантируется, что будет установлено в запросе сообщений чата,
   * в остальных случаях не гарантируется.
   */
  is_favorite?: Maybe<Scalars['Boolean']>;
  /** флаг того, что сообщение отправил текущий пользователь */
  is_my: Scalars['Boolean'];
  /** чат, в который отправили сообщение, может быть null в процитированных сообщениях */
  chat: IChat;
  /** пользователь, отправивший сообщение */
  user: RegisteredUser;
  /** идентификаторы пользователей, прочитавших сообщение */
  viewed_by: Array<Scalars['ID']>;
  /** пересланное сообщение */
  forwarded_message: ForwardedMessage;
};

export type ForwardedMessage = FileMessage | RegularMessage | DeletedMessage;

/** пол пользователя */
export enum Gender {
  /** мужчина */
  Male = 'MALE',
  /** женщина */
  Female = 'FEMALE',
  /** не определен */
  Androgynous = 'ANDROGYNOUS'
}


export type Grades = {
  __typename?: 'Grades';
  quality: Scalars['Grade'];
  communication: Scalars['Grade'];
  price: Scalars['Grade'];
};

export type GradesInput = {
  quality: Scalars['Grade'];
  communication: Scalars['Grade'];
  price: Scalars['Grade'];
};

/** Колонка задач */
export type Group = {
  __typename?: 'Group';
  id: Scalars['ID'];
  /** заголовок группы */
  title: Scalars['String'];
  /** индекс сортировки */
  rank: Scalars['LexoRank'];
  state?: Maybe<GroupState>;
};

export type GroupConnection = {
  __typename?: 'GroupConnection';
  pageInfo: PageInfo;
  edges: Array<GroupEdge>;
};

export type GroupEdge = {
  __typename?: 'GroupEdge';
  node: Group;
  cursor: Scalars['String'];
};

/** статус колонки */
export enum GroupState {
  Regular = 'REGULAR',
  Default = 'DEFAULT',
  DefaultHidden = 'DEFAULT_HIDDEN'
}

/** Интерфейс чата */
export type IChat = {
  id: Scalars['ID'];
  /** статус прочтенности/доставленности */
  check_status: CheckStatus;
  /** сохраненный черновик. интерпертировать пустую строку как отсутствие черновика */
  draft: Scalars['String'];
  /** дата создания чата */
  created_at: Scalars['DateTime'];
  /** чат скрыт */
  hidden?: Maybe<Scalars['Boolean']>;
  /** индекс сортировки *поле индивидуально для пользователя* */
  rank?: Maybe<Scalars['LexoRank']>;
  /** *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*  Уровень назойливости событий чата */
  notification: ChatNotificationState;
  /**
   * *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*  Ограничить состояние notification датой, например - отлючить звук до...
   * Если устанавливаетсу notification_disabled_till,
   * то при наступлении указанного времени,
   * состояние notification снова возвращается в ON.
   * При наступлении указанного времени,
   * придет сабскрипшн chatUpdated,
   * где будет notification = 'ON', notification_disabled_till = null .
   */
  notification_disabled_till?: Maybe<Scalars['DateTime']>;
  /**
   * файлы, прикрепленные к данному чату, но еще не отправленные
   * @deprecated от данного механизма в продукте отказались, ждем решения по новому видению
   */
  attached_files: AttachedFileConnection;
  /** избранные сообщения данного чата */
  favorite_messages: ChatFavoriteMessagesConnection;
  /** файлы, прикрепленные к сообщениям данного чата */
  files: MessageFileConnection;
  /** ссылки в сообщениях */
  links: LinkInfoConnection;
  /** сообщения чата */
  messages: IChatMessageConnection;
  /** дела, прикрепленные к чату */
  todos: TodoConnection;
  /** пользователи в чате */
  users: IChatUserConnection;
};


/** Интерфейс чата */
export type IChatAttached_FilesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Интерфейс чата */
export type IChatFavorite_MessagesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Интерфейс чата */
export type IChatFilesArgs = {
  filter?: Maybe<ChatFilesFilterInput>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  around?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Интерфейс чата */
export type IChatLinksArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Интерфейс чата */
export type IChatMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  around?: Maybe<Scalars['ID']>;
  around_bookmark?: Maybe<Scalars['Bookmark']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Интерфейс чата */
export type IChatTodosArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Интерфейс чата */
export type IChatUsersArgs = {
  state_filter?: Maybe<ChatUsersStateFilter>;
};

export type IChatConnection = {
  __typename?: 'IChatConnection';
  pageInfo: PageInfo;
  edges: Array<IChatEdge>;
};

export type IChatEdge = {
  __typename?: 'IChatEdge';
  node: IChat;
  cursor: Scalars['String'];
};

/** Коннекшн чат/сообщения */
export type IChatMessageConnection = {
  __typename?: 'IChatMessageConnection';
  pageInfo: PageInfo;
  edges: Array<IChatMessageEdge>;
};

/** Грань чат/сообщение */
export type IChatMessageEdge = {
  __typename?: 'IChatMessageEdge';
  node: IMessage;
  cursor: Scalars['String'];
  /**
   * букмарк, используется для учета прочтенности доставленности
   * см. CheckStatus
   * для bookmark гарантируется лексикографическая отсортированность
   */
  bookmark: Scalars['Bookmark'];
};

/** Грань чат/нотфикационное сообщение */
export type IChatNootificationMessageEdge = {
  __typename?: 'IChatNootificationMessageEdge';
  node: NotificationMessage;
  cursor: Scalars['String'];
  /**
   * букмарк, используется для учета прочтенности доставленности
   * см. CheckStatus
   * для bookmark гарантируется лексикографическая отсортированность
   */
  bookmark: Scalars['Bookmark'];
};

export type IChatUserConnection = {
  __typename?: 'IChatUserConnection';
  pageInfo: PageInfo;
  edges: Array<IChatUserEdge>;
};

export type IChatUserEdge = {
  __typename?: 'IChatUserEdge';
  node: User;
  cursor: Scalars['String'];
};

export type IFile = {
  /** id файла */
  id: Scalars['ID'];
  /** ключ на s3 */
  key: Scalars['String'];
  /** дата загрузки файла */
  timestamp: Scalars['DateTime'];
  /** url оригинала */
  url: Scalars['String'];
  /** размер файла */
  content_length: Scalars['LongInt'];
  /** mime-тип */
  content_type: Scalars['String'];
};

/** Интерфейс сообщений */
export type IMessage = {
  id: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  /** глобальный порядок сообщения 53-bits, сравнивая данные числа легко определить в каком порядке они были созданы аналог twitter snowflake */
  order: Scalars['LongInt'];
  /**
   * Флаг того, что сообщение в избранных.
   * Гарантируется, что будет установлено в запросе сообщений чата,
   * в остальных случаях не гарантируется.
   */
  is_favorite?: Maybe<Scalars['Boolean']>;
  /** флаг того, что сообщение отправил текущий пользователь */
  is_my: Scalars['Boolean'];
  /** чат, в который отправили сообщение, может быть null в процитированных сообщениях */
  chat: IChat;
  /** пользователь, отправивший сообщение */
  user: RegisteredUser;
  /** идентификаторы пользователей, прочитавших сообщение */
  viewed_by: Array<Scalars['ID']>;
};

export type IMessageConnection = {
  __typename?: 'IMessageConnection';
  pageInfo: PageInfo;
  edges: Array<IMessageEdge>;
};

export type IMessageEdge = {
  __typename?: 'IMessageEdge';
  node: IMessage;
  cursor: Scalars['String'];
};

export type INotificationText = {
  text: Scalars['String'];
};

/** интерфейс пользователь */
export type IUser = {
  id: Scalars['ID'];
  /** Пользователь в контактах у текущего */
  is_contact: Scalars['Boolean'];
  /** отзывы, оставленные данному пользователю. null, если отзывов нет */
  reviews: UserReviewsConnection;
};


/** интерфейс пользователь */
export type IUserReviewsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

/** используется для сохранения данных для выбора области на изображении */
export type ImageArea = {
  __typename?: 'ImageArea';
  x: Scalars['Int'];
  y: Scalars['Int'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};

/** используется для сохранения данных для выбора области на изображении */
export type ImageAreaInput = {
  x: Scalars['Int'];
  y: Scalars['Int'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type InviteActResult = {
  __typename?: 'InviteActResult';
  invited_user: InvitedUser;
};

export type InviteRequestResult = {
  __typename?: 'InviteRequestResult';
  existing_user?: Maybe<User>;
};

/** приглашенный пользователь */
export type InvitedUser = IUser & {
  __typename?: 'InvitedUser';
  id: Scalars['ID'];
  /** телефон приглашенного пользователя, отображается только пригласившему пользователю */
  phone?: Maybe<Scalars['PhoneNumber']>;
  /** Пользователь в контактах у текущего */
  is_contact: Scalars['Boolean'];
  /** отзывы, оставленные данному пользователю. null, если отзывов нет */
  reviews: UserReviewsConnection;
};


/** приглашенный пользователь */
export type InvitedUserReviewsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

/** Задача */
export type Issue = {
  __typename?: 'Issue';
  id: Scalars['ID'];
  /** дата создания задачи */
  created_at: Scalars['DateTime'];
  /** дата завершения */
  end_date?: Maybe<Scalars['DateTime']>;
  /** дата начала */
  start_date: Scalars['DateTime'];
  /** чат */
  chat: Chat;
  /** исполнитель */
  executor?: Maybe<User>;
  /** колонка */
  group: Group;
  /**
   * индекс сортировки *поле индивидуально для пользователя*
   * для закрытой задачи может быть равен z
   */
  rank: Scalars['LexoRank'];
  tags: TagConnection;
};

export type IssueConnection = {
  __typename?: 'IssueConnection';
  pageInfo: PageInfo;
  edges: Array<IssueEdge>;
};

export type IssueEdge = {
  __typename?: 'IssueEdge';
  node: Issue;
  cursor: Scalars['String'];
};

/** Коннекшн поиска задач */
export type IssueSearchConnection = {
  __typename?: 'IssueSearchConnection';
  edges: Array<IssueSearchEdge>;
};

/** Грань поиска задач */
export type IssueSearchEdge = {
  __typename?: 'IssueSearchEdge';
  node: Issue;
  by_file: MessageFile;
};

export type IssuesFilterInput = {
  /** фильтровать по id */
  ids?: Maybe<Array<Scalars['ID']>>;
  /** фильтровать по активности */
  active?: Maybe<Scalars['Boolean']>;
};



/** метаданные ссылки */
export type LinkInfo = {
  __typename?: 'LinkInfo';
  message?: Maybe<IMessage>;
  /** Флаг ошибки скраппинга */
  error: Scalars['Boolean'];
  /** Флаг выполнения скрапинга в данный момент (жди в сабскрипшне) */
  pending: Scalars['Boolean'];
  /** A human-readable representation of the author's name. */
  author?: Maybe<Scalars['String']>;
  /** An representation of the date the article was published. */
  date?: Maybe<Scalars['DateTime']>;
  /** The publisher's chosen description of the article. */
  description?: Maybe<Scalars['String']>;
  /** An image URL that best represents the article. */
  image?: Maybe<Scalars['String']>;
  /** An ISO 639-1 representation of the url content language. */
  lang?: Maybe<Scalars['String']>;
  /** An image URL that best represents the publisher brand. */
  logo?: Maybe<Scalars['String']>;
  /** A human-readable representation of the publisher's name. */
  publisher?: Maybe<Scalars['String']>;
  /** The publisher's chosen title of the article. */
  title?: Maybe<Scalars['String']>;
  /** The URL of the article. */
  url: Scalars['String'];
  /** A video URL that best represents the article. */
  video?: Maybe<Scalars['String']>;
};

export type LinkInfoConnection = {
  __typename?: 'LinkInfoConnection';
  pageInfo: PageInfo;
  edges: Array<LinkInfoEdge>;
};

export type LinkInfoEdge = {
  __typename?: 'LinkInfoEdge';
  node: LinkInfo;
  cursor: Scalars['String'];
};

/** локаль */
export enum Locale {
  /** английская */
  En = 'EN',
  /** русская */
  Ru = 'RU'
}


export type MakeOtpResult = {
  __typename?: 'MakeOTPResult';
  /** время, до которого для данного номера запросы не принимаются */
  nextBackoffTime?: Maybe<Scalars['DateTime']>;
  /** одноразовый логин */
  oneTimeLogin: Scalars['String'];
};

export type MakePosibleContactsConnection = {
  __typename?: 'MakePosibleContactsConnection';
  edges: Array<MakePosibleContactsEdge>;
};

export type MakePosibleContactsEdge = {
  __typename?: 'MakePosibleContactsEdge';
  /** Телефон из телефонной книги */
  raw_phone: Scalars['String'];
  /** Интернационализированный номер телефона */
  internationalized_phone?: Maybe<Scalars['PhoneNumber']>;
  /** Если пользователь найден, будет представлен */
  node?: Maybe<User>;
  /** Пользователь в контактах у текущего */
  is_contact: Scalars['Boolean'];
};

export type MeanGradesDetail = {
  __typename?: 'MeanGradesDetail';
  quality: Scalars['Float'];
  communication: Scalars['Float'];
  price: Scalars['Float'];
};

/** Файл отправленый сообщением */
export type MessageFile = IFile & {
  __typename?: 'MessageFile';
  /** сообщение, к которому прикреплен файл */
  message: FileMessage;
  /** тип файла */
  type: FileType;
  /** id файла */
  id: Scalars['ID'];
  /** ключ на s3 */
  key: Scalars['String'];
  /** дата загрузки файла */
  timestamp: Scalars['DateTime'];
  /** url оригинала */
  url: Scalars['String'];
  /** размер файла */
  content_length: Scalars['LongInt'];
  /** mime-тип */
  content_type: Scalars['String'];
  /** имя файла */
  file_name: Scalars['String'];
};

export type MessageFileConnection = {
  __typename?: 'MessageFileConnection';
  pageInfo: PageInfo;
  edges: Array<MessageFileEdge>;
};

export type MessageFileEdge = {
  __typename?: 'MessageFileEdge';
  node: MessageFile;
  cursor: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * # установка токена
   * действует для последующих мутаций,
   * при использовании ws, для всех последующих операций
   * ## Доступ
   * любой пользователь
   */
  setToken?: Maybe<Scalars['Boolean']>;
  /**
   * # обновление токена аутентификации
   * Время жизни токена ограничено, время жизни можно получить при создании токена
   * ## Доступ
   * любой аутентифицированный пользователь может обменять старый токен
   * на новый с продленным временем действия,
   * причем старый токен становится не действительным
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  refreshToken: AuthToken;
  /**
   * # токен аутентификации по одноразовому паролю
   * Обмен одноразового логина, полученного при вызове мутации makeOTP,
   * и одноразового пароля, высланного в смс на токен аутентификации
   * ## Доступ
   * любой неаутентифицированный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, одноразовый логин не найден
   * - *429 TooManyRequests*, последняя попытка использована, следует запросить новый код
   */
  otpToToken: OtpToTokenResult;
  /**
   * # Запрос одноразового пароля
   * Для того, чтобы аутентифицироваться на сервисе, необходимо
   * запросить одноразовый пароль. Одноразовый пароль высылается на телефон,
   * указанный в качестве аргумента. Если номер не найден в системе,
   * создается новый пользователь. Одноразовый логин и код ожидаются для
   * поля otpToToken
   * ## Доступ
   * любой неаутентифицированный пользователь
   * ## Ошибки
   * - *429 TooManyRequests*, если на данный номер повторно запрошен одноразовый пароль
   *   до истечения времени из поля nextBackoffTime. Одно из полей ошибки содержит время,
   *   оставшееся до разрешения следующего запроса.
   */
  makeOTP: MakeOtpResult;
  /**
   * # Запрос на изменение телефонного номера
   * На указанный номер телефона отправляется код подтвержения.
   * Если вновь указанный номер телефона уже привязан к другому пользователю,
   * другой пользователь переводится в статус DISABLED, его номер телефона заменяется
   * на null. Возвращает время, до которого сервис не принимает от данного пользователя
   * данных запросов.
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *429 TooManyRequests*, если данным пользователем повторно запрошен код
   *   до истечения времени из поля nextBackoffTime. Одно из полей ошибки содержит время,
   *   оставшееся до разрешения следующего запроса.
   */
  requestPhoneUpdate?: Maybe<Scalars['DateTime']>;
  /**
   * # подтверждение телефона
   * Подтверждение телефона происходит путем передачи в качестве аргумента кода,
   * высланного в смс при запросе мутации requestPhoneUpdate.
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, если код не корректен.
   * - *429 TooManyRequests*, если данным пользователем повторно запрошен код
   *   до истечения времени, возвращенного прошлым заросом. Одно из полей ошибки содержит время,
   *   оставшееся до разрешения следующего запроса.
   */
  verifyPhone: Scalars['PhoneNumber'];
  /**
   * # Погашение регистрационного промокода
   * Если включена регистрация по промокодам, то перед
   * заполнением профиля, необходимо указать промокод
   * ## Возвращает
   * новое состояние регистрации
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован
   *   или не находится в состоянии 'VAUCHER_WAITING'
   * - *403 Forbidden*, если код не корректен
   */
  setVoucher: RegistrationStep;
  /**
   * # создание приватного чата (переговорка)
   * Приватный чат создается для текущего пользователя и указанного пользователя (user_id)
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, приватный чат между пользователями уже существует
   */
  newPrivateChat: PrivateChat;
  /**
   * # создание чата
   * участниками вновь созданного чата являются текущий пользователь и
   * указанные пользователи (user_ids)
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, id создаваемого чата уже существует
   */
  newChat: Chat;
  /**
   * # Обновление чата
   * ## Доступ
   * пользователь должен быть участником чата
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 ForbiddenError*:
   *     - попытка обновить собственные поля приватного чата
   *     - статус участника текущего пользователя не позволяет обновить указанные поля
   * - *404 NotFound*, чат не найден, либо текущий пользователь не участник чата
   */
  updateChat: IChat;
  /**
   * # Удаление чата
   * ## Доступ
   * участник должен быть создателем чата, не важно в каком статусе
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 ForbiddenError*:
   *     - пользователь не является создателем чата
   *     - попытка удалить личку
   * - *404 NotFound*, чат не найден, либо текущий пользователь не участник чата
   */
  deleteChat: Scalars['ID'];
  /**
   * # Установка нового "создателя"
   * ## Доступ
   * текущий пользователь должен быть в роле "создателя"
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 ForbiddenError*:
   *     - попытка изменить создателя в приватном чата
   *     - чат закрыт
   *     - текущий пользователь не создатель
   *     - новый пользователь не активный участник
   * - *404 NotFound*:
   *     - чат не найден
   *     - текущий пользователь не участник чата
   *     - не найден участник, которому передаются права
   */
  changeChatCreator?: Maybe<Scalars['Null']>;
  /**
   * # Создание отметки о прочитанных сообщениях
   * данным методом клиент уведомляет сервис, что пользователь прочел
   * указанный чат (chat_id) до указанного сообщения (bookmark_message_id)
   * ## Доступ
   * пользователь должен быть активным участником чата
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 NotFound*:
   *     - чат не найден
   *     - текущий пользователь не участник чата
   *     - сообщение не найдено
   * - *422 ForbiddenError*:
   *     - попытка переустановить отметку на более раннее сообщение
   *     - попытка переустановить отметку на то-же сообщение
   */
  moveBookmark: CheckStatus;
  /**
   * # Закрытие чата
   * ## Доступ
   * Текущий пользователь должен быть создателем чата
   * ## Ошибки
   * - *401 Unauthorized*: пользователь не аутентифицирован или не активен
   * - *404 NotFound*:
   *     - чат не найден
   *     - текущий пользователь не участник чата
   * - *422 ForbiddenError*:
   *     - пользователь не является создателем чата
   *     - попытка закрыть уже закрытый чат
   *     - попытка закрыть личный чат
   */
  closeChat?: Maybe<Scalars['Null']>;
  /**
   * # Возобновление чата
   * ## Доступ
   * Текущий пользователь должен быть создателем чата
   * ## Ошибки
   * - *401 Unauthorized*: пользователь не аутентифицирован или не активен
   * - *404 NotFound*:
   *     - чат не найден
   *     - текущий пользователь не участник чата
   * - *422 ForbiddenError*:
   *     - пользователь не является создателем чата
   *     - попытка возобновить незакрытый чат
   */
  resumeChat?: Maybe<Scalars['Null']>;
  /**
   * # Выход из чата
   * ## Доступ
   * Текущий пользователь должен быть обычным участником чата (не создатель)
   * ## Ошибки
   * - *401 Unauthorized*: пользователь не аутентифицирован или не активен
   * - *404 NotFound*:
   *     - чат не найден
   *     - текущий пользователь не участник чата
   * - *422 ForbiddenError*:
   *     - пользователь является создателем чата
   *     - чат закрыт
   *     - попытка выйти из уже покинутого чата
   *     - личный чат
   */
  leaveFromChat?: Maybe<Scalars['Null']>;
  /**
   * # Возвращение в чат
   * ## Доступ
   * Текущий пользователь должен быть обычным участником чата (не создатель)
   * ## Ошибки
   * - *401 Unauthorized*: пользователь не аутентифицирован или не активен
   * - *404 NotFound*:
   *     - чат не найден
   *     - текущий пользователь не участник чата
   * - *422 ForbiddenError*:
   *     - пользователь является создателем чата
   *     - чат закрыт
   *     - попытка вернуться в чат, в котором вы уже состоите
   *     - личный чат
   */
  returnToChat?: Maybe<Scalars['Null']>;
  /**
   * # Добавление пользователя в чат
   * ## Доступ
   * Текущий пользователь должен быть создателем чата
   * ## Ошибки
   * - *401 Unauthorized*: пользователь не аутентифицирован или не активен
   * - *404 NotFound*:
   *     - чат не найден
   *     - текущий пользователь не участник чата
   * - *422 ForbiddenError*:
   *     - пользователь не является создателем чата
   *     - попытка добавить пользователя, который уже существует
   *     - личный чат
   */
  addUserToChat: ChatMember;
  /**
   * # Исключение пользователя из чата
   * ## Доступ
   * Текущий пользователь должен быть создателем чата
   * ## Ошибки
   * - *401 Unauthorized*: пользователь не аутентифицирован или не активен
   * - *404 NotFound*:
   *     - чат не найден
   *     - текущий пользователь не участник чата
   *     - исключаемый пользователь не найден
   * - *422 ForbiddenError*:
   *     - пользователь не является создателем чата
   *     - попытка добавить пользователя, который уже существует
   */
  removeUserFromChat: ChatMember;
  /**
   * # Сохранение черновика сообщения
   * ## Доступ
   * пользователь должен быть активным участником чата
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 NotFound*:
   *     - чат не найден, либо текущий пользователь не участник чата
   * - *422 UnprocessableEntity*:
   *     - черновик слишком большой (более 50000)
   */
  setDraft?: Maybe<Scalars['Null']>;
  /**
   * # Подписка запроса на загрузку изображения чата
   * ## Доступ
   * Любой активный участник чата
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или находится в неверном статусе
   * - *403 Forbidden*:
   *     - попытка загрузить изображение в несуществующий чат,
   *       либо пользователь не является активным участником чата
   */
  presignChatImage: PresignedRequest;
  /**
   * # Подписка запроса на загрузку аватара пользователя
   * ## Доступ
   * Любой активный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или находится в неверном статусе
   */
  presignUserImage: PresignedRequest;
  /**
   * # Подписка файла для сообщения
   * ## Доступ
   * Любой активный участник чата
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или находится в неверном статусе
   * - *403 Forbidden*:
   *     - попытка прикрепить файл к несуществующему чату,
   *       либо пользователь не является активным участником чата
   */
  presignMessageFile: PresignedRequest;
  /**
   * # Удаление файла
   * ## Доступ
   * Для удаления доступны только файлы прикрепленные к чату (AttachedFile)
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 NotFound*: файл не найден
   */
  deleteFile: Scalars['ID'];
  /**
   * # Создание колонок для задач
   * ## Доступ
   * Любой пользователь может создавать колонки
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  newGroup: Group;
  /**
   * # Обновление свойств колонки задач
   * ## Доступ
   * Пользователь может обновить любую созданную им колонку
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  updateGroup: Group;
  /**
   * # Удаление колонки задач
   * ## Доступ
   * Пользователь может удалить пустую колонку
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, попытка удалить дефолтную колонку
   * - *404 Not Found*, колонка не найдена
   */
  deleteGroup: Scalars['ID'];
  /**
   * # Скрытие дефолтной колонки
   * ## Доступ
   * У всех пользователей есть дефолтная колонка и они могут ее скрыть
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  hideDefaultGroup: Group;
  /**
   * # Обновление задачи
   * Задача связывается с уже созданным чатом (chat_id).
   * ## Доступ
   * Пользователь должен быть участником чата, связанного с задачей
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, не создатель пытается установить исполнителя
   * - *404 Not Found*:
   *     - задача не найдена
   *     - пользователь не является участником связанного чата
   */
  updateIssue: Issue;
  /**
   * # создание сообщений
   * Доступны к созданию текстовые и файловые сообщения.
   * Для создания файловых сообщений, файлы необходимо предварительно загрузить
   * в методе uploadFiles.
   * # Доступ
   * Пользователь должен быть активным участником чата, в котором
   * создаются файлы.
   * ## Ошибки
   * - *400 BadRequest*, передан пустой список сообщений
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - создается текстовое сообщение без текста и цитаты
   *     - пользователь не является активным участником чата
   * - *404 Not Found*:
   *     - чат не найден
   *     - файл не найден
   *     - цитируемое сообщение не найдено
   * - *429 TooManyRequests*, возвращается в случае попытки отправки более
   *   30 сообщений в секунду.
   * @deprecated используйте Mutation.newMessages2
   */
  newMessages: Array<IMessage>;
  /**
   * # создание сообщений
   * Доступны к созданию текстовые и файловые сообщения.
   * Для создания файловых сообщений, файлы необходимо предварительно загрузить
   * в методе uploadFiles.
   * # Доступ
   * Пользователь должен быть активным участником чата, в котором
   * создаются файлы.
   * ## Ошибки
   * - *400 BadRequest*, передан пустой список сообщений
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - создается текстовое сообщение без текста и цитаты
   *     - пользователь не является активным участником чата
   * - *404 Not Found*:
   *     - чат не найден
   *     - файл не найден
   *     - цитируемое сообщение не найдено
   */
  newMessages2: IChatMessageConnection;
  /**
   * # пересылка сообщений
   * Пользователь может переслать только те сообщения,
   * к которым он имеет доступ
   * Максимально пользователь может переслать `settings.maxForwardMessages` сообщений
   * в `settings.maxForwardChats` чатов
   */
  forwardMessages: ChatForwardMessageConnection;
  /**
   * # Обновление текстового сообщения
   * Обновление сообщение доступно в течение ограниченного времени.
   * Данное время в можно получить из запроса query { settings { messageEditTimeDelta } }
   * # Доступ
   * Пользователь должен быть отправителем сообщения и активным участником чата
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - вы не создатель сообщения
   *     - пользователь не является активным участником чата
   *     - время обновления сообщения превышено
   * - *404 Not Found*:
   *     - сообщение не найдено
   */
  updateRegularMessage: RegularMessage;
  /**
   * # Удаление сообщений
   * Удаление сообщений доступно в течение ограниченного времени после создания сообщения.
   * Данное время в можно получить из запроса query { settings { messageDeleteTimeDelta } }
   * К удалению доступно ограниченное количество сообщений.
   * Данное количество можно получить из запроса query { settings { maxDeleteMessagesCount } }
   * Если одно из сообщений не найдено, оно будет молча пропущено, остальные будут удалены,
   * клиенту не будет возвращена ошибка.
   * # Доступ
   * Пользователь должен быть отправителем сообщения и активным участником чата
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - вы не создатель сообщения
   *     - пользователь не является активным участником чата
   *     - время удаления сообщения превышено
   */
  deleteMessages: Array<Maybe<Scalars['ID']>>;
  /**
   * # Изменение отметки "избранное" для сообщения
   * Пользователь может добавлять и удалять сообщения в "избранное"
   * # Доступ
   * Пользователь должен состоять в соответсвующем чате в момент создания сообщения.
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, сообщение не найдено
   */
  setMessageFavorite?: Maybe<Scalars['Boolean']>;
  /**
   * # Установка локали
   * Локаль используется для формирования имени пользователя и сервисных сообщений.
   * ## Доступ
   * Пользователь активен
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  setLocale?: Maybe<Scalars['Null']>;
  /**
   * # Оповещение "печатает"
   * Клиент сообщает сервису, что пользователь набирает текст.
   * При наборе текста клиент должен вызывать данный метод каждые n секунд
   * до тех пор, пока пользователь не завершил набор. n следует получить из
   * { settings { typingTimeout } }.
   * ## Доступ
   * Пользователь должен быть активным участником чата.
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*: пользователь не является активным участником чата
   */
  typing?: Maybe<Scalars['Null']>;
  /**
   * # Установить статус клиента
   * Явное оповещение сервиса о статусе клиента. Если пользователь не находится
   * в статусе онлайн ни с одного клиента, считается, что он офлайн.
   * По-умолчанию клиент становится онлайн при создании вебсокет канала с
   * сервисом и офлайн при разрыве. Явно указать статус клиента можно с использованием
   * данного метода.
   * ## Доступ
   * Пользователь активен, клиент для вызова метода использует вебсокет.
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *422 Unprocessable entity*, метод вызван не используя вебсокет в качестве транспорта
   */
  setClientStatus?: Maybe<Scalars['Null']>;
  /**
   * # Установить настройки пользователя
   * Данные настройки используются исключительно клиентами,
   * никак не влияют на поведение сервера.
   * ## Доступ
   * Пользователь аутентифицирован и активен
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *422 Unprocessable entity*, переданный json > 32000 символов
   */
  setUserSettings?: Maybe<Scalars['Null']>;
  /**
   * # Создание тегов
   * ## Доступ
   * Любой пользователь может создавать теги
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  newTag: Tag;
  /**
   * # Обновление свойств тегов
   * ## Доступ
   * Пользователь может обновить любую созданнуй им тег
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  updateTag: Tag;
  /**
   * # Удаление тега
   * ## Доступ
   * Пользователь может удалить любой свой тег
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Not Found*, тег не найден
   */
  deleteTag: Scalars['ID'];
  /**
   * # Установка тегов задачи
   * При установке нового списка тегов, прежний сбрасывается
   * ## Доступ
   * Пользователь может прикреплять к задаче только собственные теги
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Not Found*, тег не найден
   */
  setIssueTags: Issue;
  /**
   * # Обновление дела
   * Дело должно быть привязано к существующей задаче
   * ## Доступ
   * Пользователь должен быть участником чата, связанного с делом
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - пользователь не является активным участником
   *     соответствующего чата
   *     - идентификатор уже существует в системе
   * - *404 Not Found*: соответствующий чат не найден в систем
   *   либо текущий пользователь не является участником чата
   */
  newTodo: Todo;
  /**
   * # Удаление дела
   * ## Доступ
   * Пользователь должен быть участником чата, связанного с задачей
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*:
   *     - задача не найдена
   *     - пользователь не является участником связанного чата
   */
  deleteTodo: Todo;
  /** обновление дела */
  updateTodo: Todo;
  /**
   * # Обновление полей текущего пользователя
   * ## Возвращает
   * Сущность текущего пользователя
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - ~~UserWithSamePhoneExists: существует пользователь с тем же телефоном~~
   *     - UserWithSameEmailExists: существует пользователь с тем же email-адресом
   */
  updateMe: ActiveUser;
  /**
   * # Регистрация пользователя
   * После регистрации для текущей сессии создается активный пользователь 'ActiveUser'
   * далее все действия происходят от имени этого пользователя
   * ## Возвращает
   * Сущность текущего пользователя
   * ## Доступ
   * Только регистрирующийся пользователь, находящийся на шаге PROFILE_FILLING
   * ## Ошибки
   * - *401 Unauthorized*, сессия не находится в состоянии регистрации
   * - *403 Forbidden*:
   *     - регистрация не находится на шаге PROFILE_FILLING
   *     - UserWithSamePhoneExists: существует пользователь с тем же телефоном
   *     - UserWithSameEmailExists: существует пользователь с тем же email-адресом
   */
  registerUser: ActiveUser;
  /**
   * # Получение пользователей по записям из телефонной книги
   * Клиент отправляет список телефонных номеров из книги,
   * в ответ сервер возвращает список зарегистрированных пользователей
   * с пометкой о наличии контакта
   * ## Возвращает
   * Список зарегистрированных пользователей
   * ## Доступ
   * Любой аутентифицированный, активный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  makePosibleContacts: MakePosibleContactsConnection;
  /**
   * # Добавить пуш-токен
   * Для получения пуш-нотификаций, клиент должен передать
   * сервису пуш-токен, полученный из firebase. О способах
   * получения пуш-токена можно прочесть в
   * (документации к FCM)[https://firebase.google.com/docs/cloud-messaging/]
   * ## Возвращает
   * null
   * ## Доступ
   * Любой аутентифицированный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован
   */
  addPushToken?: Maybe<Scalars['Boolean']>;
  /**
   * # Выход из сервиса
   * Отзывает пуш-токен, установленный в текущей сессии (привязан к токену)
   * ## Возвращает
   * null
   * ## Доступ
   * Любой аутентифицированный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован
   */
  logout?: Maybe<Scalars['Boolean']>;
  /**
   * # Создание напоминания
   * ## Возвращает
   * Вновь созданное напоминание
   * ## Доступ
   * Если напоминание ассоциируется с задачей,
   * пользователь должен быть активным участником задачи.
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - чат не найден
   *     - пользователь не активный участник чата
   *     - идентификатор уже существует в системе
   */
  newReminder: Reminder;
  /**
   * # Обновление напоминания
   * ## Возвращает
   * Обновленное напоминание
   * ## Доступ
   * Только создатель может обновить напоминание
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - пользователь не является владельцем оповещения
   *     - чат, с которым ассоциируется оповещение, не найден
   *     - пользователь не является активным участником, ассоциируемого чата
   * - *404 Not Found*:
   *     - напоминание не найдено
   */
  updateReminder: Reminder;
  /**
   * # Отметить напоминание
   * При наступлении времени оповещения напоминание
   * должно быть отображено пользователю. Данный момент фиксирует
   * факт получения напоминания пользователем.
   * ## Возвращает
   * Отмеченное напоминание
   * ## Доступ
   * Только получатель напоминание может отметить напоминание
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - TODO: пользователь не является участником оповещения
   * - *404 Not Found*:
   *     - TODO: напоминание не найдено
   */
  checkReminder: Reminder;
  /**
   * # Удаление напоминаний
   * ## Возвращает
   * Идентификаторы удаленных напоминаний
   * ## Доступ
   * Только создатель напоминания может удалить напоминание
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*:
   *     - напоминание не найдено
   *     - пользователь не является создателем напоминания
   */
  deleteReminders: Array<Scalars['ID']>;
  /**
   * # Добавление пользователя в напоминание
   * ## Возвращает
   * Добавленную грань пользователь/напоминание
   * ## Доступ
   * Только создатель напоминания может добавлять пользователей в напоминение
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, текущий пользователь не является создателем
   * - *404 Not Found*:
   *     - напоминание не найдено
   *     - добавляемый пользователь не найден
   */
  addUserToReminder: ReminderMember;
  /**
   * # Удаление пользователя из напоминания
   * ## Возвращает
   * Удаленная грань пользователь/напоминание
   * ## Доступ
   * Только создатель напоминания может произвести данное действие
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - reminder.checked != true
   *     - текущий пользователь не является создателем
   *     - текущий пользователь удаляет себя из напоминания
   * - *404 Not Found*:
   *     - напоминание не найдено
   *     - удаляемый пользователь не найден
   */
  removeUserFromReminder: RemoveUserFromReminderResult;
  /**
   * # Выход из напоминаний
   * ## Доступ
   * Только обычный участник напоминания (не создатель) может произвести данное действие
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*:
   *     - текущий пользователь является создателем (должен удалить напоминание)
   *     - текущий пользователь не является участником напоминания
   */
  removeSelfFromReminders?: Maybe<Scalars['Null']>;
  /**
   * # Явное добавление пользователя в контакты
   * Пользователь, после добавления в контакты, будет возвращаться
   * в списке пользователей при запросе ` query { users { ... }} `.
   * Эффект не симметричен.
   * ## Возвращает
   * Пользователя, добавленного в контакты
   * ## Доступ
   * Любой аутентифицированный, активный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, попытка добавить пользователя в контакты дважды
   * - *404 Not Found*, добавляемый в контакты пользователь не найден
   */
  addContact: User;
  /**
   * # Явное удаление пользователя из контактов
   * Пользователь, после удаления из контактов, будет возвращаться
   * в списке пользователей при запросе ` query { users { ... }} `.
   * Эффект не симметричен.
   * ## Доступ
   * Любой аутентифицированный, активный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, удаляумый из контактов пользователь не найден
   */
  removeContact?: Maybe<Scalars['Null']>;
  /**
   * # Создание отзыва
   * Рекомендацию можно оставить как для активного, так и для
   * приглашенного пользователя
   * ## Ошибки
   * - *400 ValidationError*, переданы не корректные данные
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, попытка оставить отзыв собственному пользователю
   * - *403 Forbidden*, попытка повторного создания отзыва
   * - *404 NotFoundError*, пользователь для отзыва не найден
   */
  createReview: Review;
  /**
   * # Обновление отзыва
   * ## Ошибки
   * - *400 ValidationError*, переданы не корректные данные
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, попытка обновить отзыв, оставленый другим пользователем
   * - *404 NotFoundError*, отзыв не найден
   */
  updateReview: Review;
  /**
   * # Удаление отзыва
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, попытка удалить отзыв, оставленый другим пользователем
   * - *404 NotFoundError*, отзыв не найден
   */
  deleteReview?: Maybe<Scalars['Null']>;
  /**
   * # Первый шаг приглашения пользователя
   * Происходит проверка на наличие приглашаемого пользователя в системе.
   *
   * ## Если пользователь в системе существует
   * Возвращается сущность существующего пользователя
   * Клиент должен отобразить профиль найденого пользователя.
   *
   * ## Если пользователь в системе не существует
   * Клиент должен перейти ко второму шагу приглашения пользователя (мутация inviteAct).
   */
  inviteRequest: InviteRequestResult;
  /**
   * # Второй шаг приглашения пользователя
   * Создается приглашенный пользователь, ему отправляется смс-приглашение
   * и опционально добавляется отзыв.
   *
   * ## Если пользователь уже существует
   * Пользователю добавляется отзыв.
   *
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *403 Forbidden*, пользователь уже приглашен.
   */
  inviteAct: InviteActResult;
  /**
   * # Переприглашение пользователя
   * Приглашаемому пользователю отправляется смс-приглашение.
   */
  inviteRetry: Void;
};


export type MutationSetTokenArgs = {
  token: Scalars['String'];
};


export type MutationOtpToTokenArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMakeOtpArgs = {
  phone: Scalars['PhoneNumber'];
};


export type MutationRequestPhoneUpdateArgs = {
  phone: Scalars['PhoneNumber'];
};


export type MutationVerifyPhoneArgs = {
  code: Scalars['String'];
};


export type MutationSetVoucherArgs = {
  voucher: Scalars['String'];
};


export type MutationNewPrivateChatArgs = {
  input: NewPrivateChatInput;
  user_id: Scalars['ID'];
};


export type MutationNewChatArgs = {
  input: NewChatInput;
  issue_input?: Maybe<NewIssueInput>;
  user_ids?: Array<Scalars['ID']>;
};


export type MutationUpdateChatArgs = {
  id: Scalars['ID'];
  input: UpdateChatInput;
};


export type MutationDeleteChatArgs = {
  id: Scalars['ID'];
};


export type MutationChangeChatCreatorArgs = {
  chat_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationMoveBookmarkArgs = {
  bookmark: Scalars['Bookmark'];
  chat_id: Scalars['ID'];
};


export type MutationCloseChatArgs = {
  chat_id: Scalars['ID'];
};


export type MutationResumeChatArgs = {
  chat_id: Scalars['ID'];
};


export type MutationLeaveFromChatArgs = {
  chat_id: Scalars['ID'];
};


export type MutationReturnToChatArgs = {
  chat_id: Scalars['ID'];
};


export type MutationAddUserToChatArgs = {
  chat_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationRemoveUserFromChatArgs = {
  chat_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationSetDraftArgs = {
  chat_id: Scalars['ID'];
  draft: Scalars['String'];
};


export type MutationPresignChatImageArgs = {
  input: PresignChatImageInput;
};


export type MutationPresignUserImageArgs = {
  input: PresignUserImageInput;
};


export type MutationPresignMessageFileArgs = {
  input: PresignMessageFileInput;
};


export type MutationDeleteFileArgs = {
  id: Scalars['ID'];
};


export type MutationNewGroupArgs = {
  input: NewGroupInput;
};


export type MutationUpdateGroupArgs = {
  id: Scalars['ID'];
  input: UpdateGroupInput;
};


export type MutationDeleteGroupArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateIssueArgs = {
  id: Scalars['ID'];
  input: UpdateIssueInput;
};


export type MutationNewMessagesArgs = {
  chat_id: Scalars['ID'];
  input: Array<NewMessageInput>;
};


export type MutationNewMessages2Args = {
  chat_id: Scalars['ID'];
  input: Array<NewMessageInput>;
};


export type MutationForwardMessagesArgs = {
  message_ids: Array<Scalars['ID']>;
  to_chat_ids: Array<Scalars['ID']>;
};


export type MutationUpdateRegularMessageArgs = {
  input: UpdateMessageInput;
  message_id: Scalars['ID'];
};


export type MutationDeleteMessagesArgs = {
  chat_id: Scalars['ID'];
  message_ids: Array<Scalars['ID']>;
};


export type MutationSetMessageFavoriteArgs = {
  favorite: Scalars['Boolean'];
  message_id: Scalars['ID'];
};


export type MutationSetLocaleArgs = {
  locale: Locale;
};


export type MutationTypingArgs = {
  chat_id: Scalars['ID'];
};


export type MutationSetClientStatusArgs = {
  online: Scalars['Boolean'];
};


export type MutationSetUserSettingsArgs = {
  data: Scalars['JSON'];
};


export type MutationNewTagArgs = {
  input: NewTagInput;
};


export type MutationUpdateTagArgs = {
  id: Scalars['ID'];
  input: UpdateTagInput;
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID'];
};


export type MutationSetIssueTagsArgs = {
  issue_id: Scalars['ID'];
  tag_ids: Array<Scalars['ID']>;
};


export type MutationNewTodoArgs = {
  input: NewTodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  input: UpdateTodoInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateUserInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
  avatar_id?: Maybe<Scalars['ID']>;
};


export type MutationMakePosibleContactsArgs = {
  phones: Array<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
};


export type MutationAddPushTokenArgs = {
  token: Scalars['String'];
};


export type MutationNewReminderArgs = {
  input: NewReminderInput;
};


export type MutationUpdateReminderArgs = {
  id: Scalars['ID'];
  input: UpdateReminderInput;
};


export type MutationCheckReminderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRemindersArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationAddUserToReminderArgs = {
  reminder_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationRemoveUserFromReminderArgs = {
  reminder_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationRemoveSelfFromRemindersArgs = {
  reminder_ids: Array<Scalars['ID']>;
};


export type MutationAddContactArgs = {
  user_id: Scalars['ID'];
};


export type MutationRemoveContactArgs = {
  user_id: Scalars['ID'];
};


export type MutationCreateReviewArgs = {
  user_id: Scalars['ID'];
  input: CreateReviewInput;
};


export type MutationUpdateReviewArgs = {
  id: Scalars['ID'];
  input: UpdateReviewInput;
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID'];
};


export type MutationInviteRequestArgs = {
  phone: Scalars['PhoneNumber'];
};


export type MutationInviteActArgs = {
  phone: Scalars['PhoneNumber'];
  review?: Maybe<CreateReviewInput>;
};


export type MutationInviteRetryArgs = {
  user_id: Scalars['ID'];
};

export type MyUser = ActiveUser | RegisteringUser;

export type NewChatInput = {
  /** id чата */
  id?: Maybe<Scalars['ID']>;
  /** название задачи */
  title: Scalars['String'];
  /** описание задачи */
  caption?: Maybe<Scalars['String']>;
  /**
   * *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*
   * уровень назойливости событий чата,
   */
  notification?: Maybe<ChatNotificationState>;
  /**
   * *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*    Ограничить состояние notification датой, например - отлючить звук до...
   * Если устанавливаетсу notification_disabled_till,
   * то при наступлении указанного времени,
   * состояние notification снова возвращается в ON.
   * При наступлении указанного времени,
   * придет сабскрипшн chatUpdated,
   * где будет notification = 'ON', notification_disabled_till = null .
   */
  notification_disabled_till?: Maybe<Scalars['DateTime']>;
  /** чат скрыт */
  hidden?: Maybe<Scalars['Boolean']>;
};

export type NewFileMessageInput = {
  /** id сообщения */
  id?: Maybe<Scalars['ID']>;
  /** id отправляемого файла */
  file_id: Scalars['ID'];
  /** id цитируемого сообщения */
  quoted_message_id?: Maybe<Scalars['ID']>;
};

export type NewGroupInput = {
  id?: Maybe<Scalars['ID']>;
  /** заголовок группы */
  title: Scalars['String'];
  /** индекс сортировки */
  rank?: Maybe<Scalars['LexoRank']>;
};

export type NewIssueInput = {
  /** id задачи */
  id?: Maybe<Scalars['ID']>;
  /** дата завершения */
  end_date?: Maybe<Scalars['DateTime']>;
  /** дата начала */
  start_date?: Maybe<Scalars['DateTime']>;
  /** id исполнителя */
  executor_user_id?: Maybe<Scalars['ID']>;
  /** id колонки */
  group_id?: Maybe<Scalars['ID']>;
  /** индекс сортировки *поле индивидуально для пользователя* */
  rank?: Maybe<Scalars['LexoRank']>;
};

export type NewMessageInput = {
  /** для текстового сообщения */
  text_message?: Maybe<NewTextMessageInput>;
  /** для сообщения-файла */
  file_message?: Maybe<NewFileMessageInput>;
};

export type NewPrivateChatInput = {
  /** id чата */
  id?: Maybe<Scalars['ID']>;
};

export type NewReminderInput = {
  /** id напоминания */
  id?: Maybe<Scalars['ID']>;
  /** время срабатывания напоминания */
  timestamp: Scalars['DateTime'];
  /** название задачи */
  title: Scalars['String'];
};

export type NewTagInput = {
  id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  color: Scalars['Int'];
};

export type NewTextMessageInput = {
  /** id сообщения */
  id?: Maybe<Scalars['ID']>;
  /** текст сообщения */
  message: Scalars['String'];
  /** id цитируемого сообщения */
  quoted_message_id?: Maybe<Scalars['ID']>;
};

export type NewTodoInput = {
  /** id задачи */
  id?: Maybe<Scalars['ID']>;
  /** описание задачи */
  caption?: Maybe<Scalars['String']>;
  /** состаяние задачи */
  state?: Maybe<TodoState>;
  /** название задачи */
  title: Scalars['String'];
  /** id чата */
  chat_id: Scalars['ID'];
  /** индекс сортировки */
  rank?: Maybe<Scalars['LexoRank']>;
  /** дата завершения */
  end_date?: Maybe<Scalars['DateTime']>;
  /** дата начала */
  start_date?: Maybe<Scalars['DateTime']>;
};

export type NotificationDsl = NotificationText | NotificationUser | NotificationTodo;

/** сообщение-уведомление */
export type NotificationMessage = IMessage & {
  __typename?: 'NotificationMessage';
  id: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  /** глобальный порядок сообщения 53-bits, сравнивая данные числа легко определить в каком порядке они были созданы аналог twitter snowflake */
  order: Scalars['LongInt'];
  /**
   * Флаг того, что сообщение в избранных.
   * Гарантируется, что будет установлено в запросе сообщений чата,
   * в остальных случаях не гарантируется.
   */
  is_favorite?: Maybe<Scalars['Boolean']>;
  /** флаг того, что сообщение отправил текущий пользователь */
  is_my: Scalars['Boolean'];
  /** чат, в который отправили сообщение, может быть null в процитированных сообщениях */
  chat: IChat;
  /** пользователь, отправивший сообщение */
  user: RegisteredUser;
  /** идентификаторы пользователей, прочитавших сообщение */
  viewed_by: Array<Scalars['ID']>;
  /** данные для формирования сообщения */
  data: Array<NotificationDsl>;
};

export type NotificationText = INotificationText & {
  __typename?: 'NotificationText';
  text: Scalars['String'];
};

export type NotificationTodo = INotificationText & {
  __typename?: 'NotificationTodo';
  id?: Maybe<Scalars['ID']>;
  text: Scalars['String'];
};

export type NotificationUser = INotificationText & {
  __typename?: 'NotificationUser';
  id: Scalars['ID'];
  text: Scalars['String'];
};


export type OtpToTokenResult = {
  __typename?: 'OTPToTokenResult';
  /** пользователь, под которым текущая сессия стала аутентифицирована */
  me: MyUser;
  /** токен аутентификации */
  token: AuthToken;
};

export type OnlineChangeResult = {
  __typename?: 'OnlineChangeResult';
  /** Идентификатор пользователя изменившего статус онлайн */
  id: Scalars['ID'];
  /** время когда пользователь был последний раз онлайн */
  last_seen: Scalars['DateTime'];
  /** состояние пользователя */
  online: Scalars['Boolean'];
};

/** Информация о пагинации в коннекшне */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Существует ли еще следующая страница? */
  hasNextPage: Scalars['Boolean'];
  /** Существует ли предыдущая страница? */
  hasPreviousPage: Scalars['Boolean'];
  /** Первый курсор на странице. Может использоваться для получения предыдущей страницы */
  startCursor?: Maybe<Scalars['String']>;
  /** Последний курсор на странице. Может использоваться для получения следующей страницы */
  endCursor?: Maybe<Scalars['String']>;
  /** Первый курсор со следующей страницы */
  nextPageStartCursor?: Maybe<Scalars['String']>;
  /** Последний курсор с предыдущей страницы */
  prevPageEndCursor?: Maybe<Scalars['String']>;
};


export type PresignChatImageInput = {
  /** id файла */
  id?: Maybe<Scalars['ID']>;
  chat_id: Scalars['ID'];
  content_type: Scalars['String'];
  content_length: Scalars['LongInt'];
  area?: Maybe<ImageAreaInput>;
};

export type PresignMessageFileInput = {
  /** id файла */
  id?: Maybe<Scalars['ID']>;
  chat_id: Scalars['ID'];
  content_type: Scalars['String'];
  content_length: Scalars['LongInt'];
  filename: Scalars['String'];
  /** тип файла */
  type: FileType;
};

export type PresignUserImageInput = {
  /** id файла */
  id?: Maybe<Scalars['ID']>;
  content_type: Scalars['String'];
  content_length: Scalars['LongInt'];
  area?: Maybe<ImageAreaInput>;
};

export type PresignedField = {
  __typename?: 'PresignedField';
  name: Scalars['String'];
  value: Scalars['String'];
};

/**
 * Подписаный запрос, содержит и необходимые поля, которые необходимо отправить
 * в виде FormData.
 * Также должно быть добавлено поле "file", содержащее контент загружаемого файла
 */
export type PresignedRequest = {
  __typename?: 'PresignedRequest';
  url: Scalars['String'];
  fields: Array<PresignedField>;
};

/** Приватный чат (личка) */
export type PrivateChat = IChat & {
  __typename?: 'PrivateChat';
  id: Scalars['ID'];
  /** статус прочтенности/доставленности */
  check_status: CheckStatus;
  /** сохраненный черновик. интерпертировать пустую строку как отсутствие черновика */
  draft: Scalars['String'];
  /** дата создания чата */
  created_at: Scalars['DateTime'];
  /** файлы, прикрепленные к данному чату, но еще не отправленные */
  attached_files: AttachedFileConnection;
  /** избранные сообщения данного чата */
  favorite_messages: ChatFavoriteMessagesConnection;
  /** файлы, прикрепленные к сообщениям данного чата */
  files: MessageFileConnection;
  /** ссылки в сообщениях */
  links: LinkInfoConnection;
  /** сообщения чата */
  messages: IChatMessageConnection;
  /** дела, прикрепленные к чату */
  todos: TodoConnection;
  /** пользователи в чате */
  users: IChatUserConnection;
  /** второй пользователь переговорки */
  another_user: User;
  /** чат скрыт */
  hidden?: Maybe<Scalars['Boolean']>;
  /** индекс сортировки *поле индивидуально для пользователя* */
  rank?: Maybe<Scalars['LexoRank']>;
  /** *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*  Уровень назойливости событий чата */
  notification: ChatNotificationState;
  /**
   * *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*  Ограничить состояние notification датой, например - отлючить звук до...
   * Если устанавливаетсу notification_disabled_till,
   * то при наступлении указанного времени,
   * состояние notification снова возвращается в ON.
   * При наступлении указанного времени,
   * придет сабскрипшн chatUpdated,
   * где будет notification = 'ON', notification_disabled_till = null .
   */
  notification_disabled_till?: Maybe<Scalars['DateTime']>;
};


/** Приватный чат (личка) */
export type PrivateChatAttached_FilesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Приватный чат (личка) */
export type PrivateChatFavorite_MessagesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Приватный чат (личка) */
export type PrivateChatFilesArgs = {
  filter?: Maybe<ChatFilesFilterInput>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  around?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Приватный чат (личка) */
export type PrivateChatLinksArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Приватный чат (личка) */
export type PrivateChatMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  around?: Maybe<Scalars['ID']>;
  around_bookmark?: Maybe<Scalars['Bookmark']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Приватный чат (личка) */
export type PrivateChatTodosArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Приватный чат (личка) */
export type PrivateChatUsersArgs = {
  state_filter?: Maybe<ChatUsersStateFilter>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * # установка токена
   * действует для внутренних полей,
   * с сестринскими полями поведение не определено
   * ## Доступ
   * любой анонимный пользователь
   */
  withToken: Query;
  /**
   * # Чат по идентификатору
   * ## Доступ
   * пользователь является участником чата
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, объект не найден
   */
  chat: IChat;
  /**
   * # Список чатов
   * ## Доступ
   * пользователь является участником чата
   * если это личка - в нее были созданы сообщения
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  chats: IChatConnection;
  /**
   * # Колонка по идентификатору
   * ## Доступ
   * Пользователь - создатель группы
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, объект не найден
   */
  group: Group;
  /**
   * # Список колонок
   * ## Доступ
   * Пользователь - создатель группы
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  groups: GroupConnection;
  /**
   * # Список задач
   * ## Доступ
   * задача связана с чатом, к которому пользователь имеет доступ
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  issues: IssueConnection;
  /**
   * # Задача по идентификатору
   * ## Доступ
   * задача связана с чатом, к которому пользователь имеет доступ
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, объект не найден
   */
  issue: Issue;
  searchIssue: IssueSearchConnection;
  /**
   * # Сообщение по идентификатору
   * ## Доступ
   * пользователь был активным участником чата на момент создания сообщения
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, объект не найден
   */
  message: IMessage;
  /**
   * # Полнотекстовый поиск по тексту сообщений
   * ## Доступ
   * пользователь был активным участником чата на момент создания сообщения
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  searchMessages: SearchMessagesConnection;
  /**
   * # Избранные сообщения
   * Сообщения выводятся по убыванию времени добавления в избранные
   * ## Доступ
   * пользователь добавил сообщение в избанные
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  favoriteMessages: IMessageConnection;
  /** # Конфигурация сервера */
  settings: Settings;
  /**
   * # Время сервера
   * Используется для синхронизации времени клиента и сервера.
   * Для синхронизации рекомендуется использовать алгоритм компенсации, аналогичный SNTP.
   * [пример использования, rest заменить на graphql](
   *     https://github.com/enmasseio/timesync/blob/master/examples/advanced/express/index.html
   * )
   */
  timesync: Scalars['DateTime'];
  /** # Параметры пользователя */
  userSettings?: Maybe<Scalars['JSON']>;
  /** Локаль текущего соединения */
  locale: Locale;
  /**
   * # Тег по идентификатору
   * ## Доступ
   * Пользователь - создатель группы
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, объект не найден
   */
  tag: Tag;
  /**
   * # Список тегов
   * ## Доступ
   * Пользователь - создатель группы
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  tags: TagConnection;
  /**
   * # Поиск пользователей
   * Поиск производится по полям last_name, first_name, job_title, city, email
   * по полному соответствию.
   * По email также происходит поиск по триграммам, а также по подстроке.
   * ## Доступ
   * все пользователи доступны
   */
  search: Array<ActiveUser>;
  /**
   * # Текущий пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован
   */
  me: MyUser;
  /**
   * # Пользователь по идентификатору
   * ## Доступ
   * текущий пользователь и искомый имеют общий чат/задачу/напоминание
   * либо явно добавлены с использованием addContact
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, объект не найден
   */
  user: User;
  /**
   * # Получение пользователя по номеру телефона
   * ## Доступ
   * любой активный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  user_by_phone?: Maybe<User>;
  /**
   * # Напоминание по идентификатору
   * ## Доступ
   * пользователь является получателем напоминания
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, объект не найден
   */
  reminder: Reminder;
  /**
   * # Список напоминаний
   * ## Доступ
   * пользователь является получателем напоминания
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  reminders: ReminderConnection;
  /**
   * # Список пользователей добавленных в контакты
   * ## Доступ
   * пользователи явно добавлены с использованием мутации addContact
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  contactUsers: ContactUsersConnection;
  /**
   * # Список пользователей
   * ## Доступ
   * текущий пользователь и искомый имеют общий чат/задачу/напоминание
   * либо явно добавлены с использованием addContact
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  users: RootUserConnection;
  /**
   * # Перечень пользователей, имеющих отзыв
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  usersWithReview: UsersWithReviewConnection;
  /**
   * # Рекомендация по идентификатору
   * ## Доступ
   * любой аутентифицированный пользователь
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * - *404 Not Found*, объект не найден
   */
  review: Review;
};


export type QueryWithTokenArgs = {
  token: Scalars['String'];
};


export type QueryChatArgs = {
  id: Scalars['ID'];
};


export type QueryChatsArgs = {
  filter?: Maybe<ChatsFilterInput>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryIssuesArgs = {
  filter?: Maybe<IssuesFilterInput>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryIssueArgs = {
  id: Scalars['ID'];
};


export type QuerySearchIssueArgs = {
  q: Scalars['String'];
};


export type QueryMessageArgs = {
  id: Scalars['ID'];
};


export type QuerySearchMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Scalars['Int'];
  query: Scalars['String'];
  filter?: Maybe<SearchMessageFilter>;
};


export type QueryFavoriteMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTagArgs = {
  id: Scalars['ID'];
};


export type QuerySearchArgs = {
  exclude?: Maybe<Array<Scalars['ID']>>;
  first?: Maybe<Scalars['Int']>;
  q: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUser_By_PhoneArgs = {
  phone: Scalars['PhoneNumber'];
};


export type QueryReminderArgs = {
  id: Scalars['ID'];
};


export type QueryRemindersArgs = {
  filter?: Maybe<ReminderFilterInput>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryContactUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryUsersWithReviewArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryReviewArgs = {
  id: Scalars['ID'];
};

export type QuotedMessage = FileMessage | RegularMessage | ForwardMessage | DeletedMessage;

export type RegisterUserInput = {
  /** email пользователя */
  email: Scalars['Email'];
  /** имя */
  first_name: Scalars['String'];
  /** фамилия */
  last_name: Scalars['String'];
  /** специальность */
  job_title?: Maybe<Scalars['String']>;
  /** город */
  city?: Maybe<Scalars['String']>;
};

export type RegisteredUser = ActiveUser;

/** пользователь, находящийся в процессе регистрации */
export type RegisteringUser = {
  __typename?: 'RegisteringUser';
  /** телефон пользователя */
  phone: Scalars['PhoneNumber'];
  /** шаг регистрации */
  registration_step: RegistrationStep;
  /** аватар пользователя */
  avatar?: Maybe<UserImage>;
};

export type RegisteringUserImageUploadedResult = {
  __typename?: 'RegisteringUserImageUploadedResult';
  /** аватар */
  image: UserImage;
};

/** текущий шаг регистрации */
export enum RegistrationStep {
  /** ожидается ввод регистрационнаго кода */
  VoucherFilling = 'VOUCHER_FILLING',
  /** ожидает заполнения профиля */
  ProfileFilling = 'PROFILE_FILLING'
}

/** обычное сообщение */
export type RegularMessage = IMessage & {
  __typename?: 'RegularMessage';
  id: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  /** глобальный порядок сообщения 53-bits, сравнивая данные числа легко определить в каком порядке они были созданы аналог twitter snowflake */
  order: Scalars['LongInt'];
  /**
   * Флаг того, что сообщение в избранных.
   * Гарантируется, что будет установлено в запросе сообщений чата,
   * в остальных случаях не гарантируется.
   */
  is_favorite?: Maybe<Scalars['Boolean']>;
  /** флаг того, что сообщение отправил текущий пользователь */
  is_my: Scalars['Boolean'];
  /** флаг того, что сообщение было отредактировано */
  edited: Scalars['Boolean'];
  /** чат, в который отправили сообщение, может быть null в процитированных сообщениях */
  chat: IChat;
  /** пользователь, отправивший сообщение */
  user: RegisteredUser;
  /** идентификаторы пользователей, прочитавших сообщение */
  viewed_by: Array<Scalars['ID']>;
  /** информация о ссылках в данном сообщении */
  links: Array<LinkInfo>;
  /** текст сообщения */
  message: Scalars['String'];
  quoted_message?: Maybe<QuotedMessage>;
  /**
   * Пользователи, упомянутые в сообщении.
   * Сейчас - возвращаются все упомянутые пользователи,
   * в дальнейшем будут возвращаться только пользователи,
   * не являющиеся участниками чата
   */
  mentioned_users: UserConnection;
};

/** Напоминание */
export type Reminder = {
  __typename?: 'Reminder';
  id: Scalars['ID'];
  /** флаг получения оповещения для текущего пользователя */
  checked: Scalars['Boolean'];
  /** авторизованный пользователь - создатель напоминания */
  is_my: Scalars['Boolean'];
  /** время срабатывания напоминания */
  timestamp: Scalars['DateTime'];
  /** название напоминания */
  title: Scalars['String'];
  /** пользователь-создатель напоминания */
  creator: RegisteredUser;
  /** пользователи в чате */
  users: ReminderUserConnection;
  /** дата создания напоминания */
  created_at: Scalars['DateTime'];
};

export type ReminderConnection = {
  __typename?: 'ReminderConnection';
  pageInfo: PageInfo;
  edges: Array<ReminderEdge>;
};

export type ReminderEdge = {
  __typename?: 'ReminderEdge';
  node: Reminder;
  cursor: Scalars['String'];
};

/** Фильтр по списку напоминаний */
export type ReminderFilterInput = {
  /**
   * фильтровать по флагу оповещения, если передан true, будут выбраны чекнутые напоминания,
   * если false, нечекнуты
   */
  checked?: Maybe<Scalars['Boolean']>;
};

/** Грань пользователь/оповещение */
export type ReminderMember = {
  __typename?: 'ReminderMember';
  /** напоминание */
  reminder: Reminder;
  /** пользователь */
  user: User;
};

/** Коннекшн напоминание/пользователь */
export type ReminderUserConnection = {
  __typename?: 'ReminderUserConnection';
  pageInfo: PageInfo;
  edges: Array<ReminderUserEdge>;
};

/** Грань напоминание/сообщение */
export type ReminderUserEdge = {
  __typename?: 'ReminderUserEdge';
  node: User;
  cursor: Scalars['String'];
};

/** Результат удалениея пользователя из напоминания */
export type RemoveUserFromReminderResult = {
  __typename?: 'RemoveUserFromReminderResult';
  /** ID напоминания */
  reminder_id: Scalars['ID'];
  /** ID пользователя */
  user_id: Scalars['ID'];
};

/** Рекомендация */
export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  /** Название оказаной услуги */
  title: Scalars['String'];
  /** Текст отзыва */
  description: Scalars['String'];
  /** Время создания */
  timestamp: Scalars['DateTime'];
  /** Средняя оценка отзыва */
  mean_grade: Scalars['Float'];
  /** Оценки детально */
  grades: Grades;
  /** Пользователь, оставивший отзыв */
  reviewer: ActiveUser;
  user: IUser;
};

export type RootUserConnection = {
  __typename?: 'RootUserConnection';
  edges: Array<RootUserEdge>;
};

export type RootUserEdge = {
  __typename?: 'RootUserEdge';
  /** Пользователь в контактах у текущего */
  is_contact: Scalars['Boolean'];
  node: User;
};

export type SearchMessageFilter = {
  where: SearchMessageWhere;
};

export enum SearchMessageWhere {
  Issue = 'ISSUE',
  Chat = 'CHAT',
  PmChat = 'PM_CHAT'
}

export type SearchMessagesConnection = {
  __typename?: 'SearchMessagesConnection';
  pageInfo: PageInfo;
  edges: Array<SearchMessagesEdge>;
  /** # Количество найденных сообщений */
  count: Scalars['Int'];
};

export type SearchMessagesEdge = {
  __typename?: 'SearchMessagesEdge';
  node: RegularMessage;
  cursor: Scalars['String'];
};

/** настройки */
export type Settings = {
  __typename?: 'Settings';
  /** Ограничение на количество тегов, которые может создать пользователь */
  maxUserTags: Scalars['Int'];
  /** Ограничение на количество тегов, которые можно прикрепить к задаче */
  maxIssueTags: Scalars['Int'];
  /** Ограничение на количество участников чата (задачи) */
  maxChatMembersCount: Scalars['Int'];
  /** Ограничение на количество участников напоминания */
  maxReminderMembersCount: Scalars['Int'];
  /** Максимальное сообщений для пересылки */
  maxForwardMessages: Scalars['Int'];
  /** Максимальное количество чатов для пересылки сообщений */
  maxForwardChats: Scalars['Int'];
  /** Максимальное количество сообщений, которые можно удалить одновременно */
  maxDeleteMessagesCount: Scalars['Int'];
  /** Максимальный размер поля ввода, кроме размера текста сообщения */
  maxFieldLength: Scalars['Int'];
  /** Максимальный размер текста сообщения */
  maxMessageLength: Scalars['Int'];
  /** Максимальный размер черновика (chat.draft) */
  maxDraftLength: Scalars['Int'];
  /** Максимальный размер файла, загружаемого в сообщения */
  maxMessageFileLength: Scalars['LongInt'];
  /** Максимальный размер файла, загружаемого в сообщения */
  maxMessageImageLength: Scalars['LongInt'];
  /** Максимальный размер изображения чата */
  maxChatImageLength: Scalars['LongInt'];
  /** Максимальный размер изображения чата */
  maxUserImageLength: Scalars['LongInt'];
  /** Максимальное количество сообщений, которые можно отправить в секунду */
  maxMessagesPerSecond: Scalars['Int'];
  /** адрес сервиса бизнес-логики */
  backendBaseUrl: Scalars['String'];
  /** адрес фронт-енда для данного окрежения */
  frontendBaseUrl: Scalars['String'];
  /** адрес сервиса ресайза изображений */
  resizeBaseUrl: Scalars['String'];
  /** адрес сервиса веб-скрапинга */
  scrapperBaseUrl: Scalars['String'];
  /** адрес сервиса множественного скачивания файлов */
  zipperBaseUrl: Scalars['String'];
  /** рекомендованный таймаут для отправки информации о том, что пользователь набирает сообщение */
  typingTimeout: Scalars['Int'];
  /** количество секунд с создания сообщения в течение которого доступно его обновление */
  messageUpdateInterval: Scalars['Int'];
  /** количество секунд с создания сообщения в течение которого доступно его удаление */
  messageDeleteInterval: Scalars['Int'];
  /** количество секунд с создания чата, в течение которых доступно удаление */
  chatDeleteInterval: Scalars['Int'];
  /** версия сервиса бизнес-логики */
  version?: Maybe<Scalars['String']>;
  /** Максимальная длина поля описания в отзыве */
  maxReviewDescriptionLength: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /**
   * # Чат создан
   * ## Возвращает
   * Вновь созданный чат
   * Вновь созданную задачу (при наличии)
   * Вновь созданное сервисное сообщение
   * ## Доступ
   * Доставляется всем участникам вновь созданного чата
   * ## Мутации, генерирующие данное событие
   * - newChat
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  fChatCreated: CreateChatResult;
  /**
   * # В чат добавлен пользователь
   * ## Возвращает
   * Новую грань пользователь/чат
   * Вновь созданное нотификационное сообщение
   * ## Доступ
   * Доставляется всем *активным* участникам соответствующего чата
   * ## Мутации, генерирующие данное событие
   * - addUserToChat
   * - returnToChat
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  fUserAddedToChat: AddUserToChatResult;
  /**
   * # Чат создан
   * ## Возвращает
   * Вновь созданный чат
   * ## Доступ
   * Доставляется всем участникам вновь созданного чата
   * ## Мутации, генерирующие данное событие
   * - newPrivateChat
   * - newChat
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * @deprecated используйте pmChatActivated и groupChatCreated
   */
  chatCreated: IChat;
  /**
   * # В личный чат было создано сообщение
   * ## Возвращает
   * Активированный личный чат
   * ## Доступ
   * Доставляется всем чата
   * ## Мутации, генерирующие данное событие
   * - newMessages
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  privateChatActivated: PrivateChat;
  /**
   * # Создан групповой чат
   * ## Возвращает
   * Вновь созанный групповой чат чат
   * ## Доступ
   * Доставляется всем чата
   * ## Мутации, генерирующие данное событие
   * - newChat
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  groupChatCreated: Chat;
  /**
   * # Чат обновлен
   * Оповещает об обновлении чата. Если при обновлении задачи
   * было установлено поле notification_disabled_till,
   * оповещение также срабатывает при наступлении указанного срока.
   * ## Возвращает
   * Обновленный чат
   * ## Доступ
   * Доставляется всем участникам вновь созданного чата
   * ## Мутации, генерирующие данное событие
   * - updateChat
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  chatUpdated: IChat;
  /**
   * # Чат удален
   * Оповещает об удалении чата.
   * ## Возвращает
   * Идентификатор удаленного чата
   * ## Доступ
   * Доставляется всем участникам удаленного чата
   * ## Мутации, генерирующие данное событие
   * - deleteChat
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  chatDeleted: Scalars['ID'];
  /**
   * # Обновлена статуса доставки сообщений
   * ## Возвращает
   * Статус доставки
   * ## Доступ
   * Доставляется всем *активным* участникам соответствующего чата
   * ## Мутации, генерирующие данное событие
   * - moveBookmark
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  checkStatusUpdated: CheckStatus;
  /**
   * # Из чата удален пользователь
   * ## Возвращает
   * Грань пользователь/чат
   * ## Доступ
   * Доставляется всем *активным* участникам соответствующего чата
   * ## Мутации, генерирующие данное событие
   * - removeUserFromChat
   * - leaveFromChat
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  userRemovedFromChat: ChatMember;
  /**
   * # В чат установлен черновик
   * ## Возвращает
   * Черновик и идентификатор соответствующего чата
   * ## Доступ
   * Доставляется всем клиентам пользователя, установивщего черновик
   * ## Мутации, генерирующие данное событие
   * - setDraft
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  draftSet?: Maybe<DraftSetResult>;
  /**
   * # Файл удален
   * ## Возвращает
   * Удаленный файл
   * ## Доступ
   * После удаления файла все клиенты, загрузившего пользователя
   * ## Мутации, генерирующие данное событие
   * - deleteFile
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  fileDeleted: Scalars['ID'];
  /**
   * # Обновлено изображение чата
   * ## Возвращает
   * Загруженное изображение чата
   * ## Доступ
   * Все участники задачи в любом статусе
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  chatImageUploaded: ChatImageUploadedResult;
  /**
   * # Файл прикреплен к чату
   * ## Возвращает
   * Прикрепленный файл
   * ## Доступ
   * После прикрепления файла к чату оповещает все клиенты, загрузившего пользователя
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  fileAttached: AttachedFile;
  /**
   * # Обновлен аватар (ваш или вашего контакта)
   * ## Возвращает
   * Обновленный аватар
   * ## Доступ
   * После успешной загрузке аватара оповещает всех пользователей, имеющих
   * общий чат, либо общее напоимнание либо явно находящегося в контактах у
   * получателя сабскрипшна.
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  userImageUploaded: UserImageUploadedResult;
  /**
   * # Обновлен аватар на этапе регистрации
   * ## Возвращает
   * Обновленный аватар
   * ## Доступ
   * Поле доступно только для пользователей на этапе регистрации
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не находится на этапе регистрации
   */
  registeringUserImageUploaded: RegisteringUserImageUploadedResult;
  /**
   * # Колонка создана
   * ## Возвращает
   * Вновь созданную группу
   * ## Доступ
   * Доставляется всем клиентам, пользователя создавшего колонку
   * ## Мутации, генерирующие данное событие
   * - newGroup
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  groupCreated: Group;
  /**
   * # Колонка обновлена
   * ## Возвращает
   * Вновь обновленную группу
   * ## Доступ
   * Доставляется всем клиентам, пользователя - создателя колонки
   * ## Мутации, генерирующие данное событие
   * - updateGroup
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  groupUpdated: Group;
  /**
   * # Колонка удалена
   * ## Возвращает
   * Идентификатор удаленной колонки
   * ## Доступ
   * Доставляется всем клиентам, пользователя - создателя колонки
   * ## Мутации, генерирующие данное событие
   * - deleteGroup
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  groupDeleted: Scalars['ID'];
  /**
   * # Задача обновлена
   * ## Возвращает
   * Вновь созданную задачу
   * ## Доступ
   * Доставляется всем участникам чата, связанного с задачей
   * ## Мутации, генерирующие данное событие
   * - updateIssue
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  issueUpdated: Issue;
  /**
   * # url обработан
   * Событие инициализируется запросом необработанной ссылки,
   * а также при создании сообщения, содержащего ссылки.
   * ## Возвращает
   * Метаданные url
   * ## Доступ
   * Доставляется всем *активным* участникам чата, в которое было опубликовано
   * сообщение, содержащее ссылку.
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  urlScraped: LinkInfo;
  /**
   * # Сообщения созданы
   * ## Возвращает
   * Вновь созданное сообщение
   * ## Доступ
   * Доставляется всем *активным* участникам чата, в которое публикуется сообщение
   * ## Мутации, генерирующие данное событие
   * - newMessage
   * - множество мутаций по созданию и изменению сущностей генерирующих сервимные сообщения
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  messagesCreated: IChatMessageConnection;
  /**
   * # Сообщениe создано
   * ## Возвращает
   * Вновь созданное сообщение
   * ## Доступ
   * Доставляется всем *активным* участникам чата, в которое публикуется сообщение
   * ## Мутации, генерирующие данное событие
   * - newMessage
   * - множество мутаций по созданию и изменению сущностей генерирующих сервимные сообщения
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   * @deprecated используйте Subscription.messagesCreated
   */
  messageCreated: IChatMessageEdge;
  /**
   * # Сообщение обновлено
   * ## Возвращает
   * Обнавленное сообщение
   * ## Доступ
   * Доставляется всем участникам чата, имеющим доступ к обновленному сообщению
   * ## Мутации, генерирующие данное событие
   * - updateRegularMessage
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  messageUpdated: IMessage;
  /**
   * # Сообщения удалены
   * ## Возвращает
   * Идентификатор удаленных сообщений
   * ## Доступ
   * Доставляется всем участникам чата, имеющим доступ к удаленному сообщению
   * ## Мутации, генерирующие данное событие
   * - deleteMessages
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  messagesDeleted: Array<Scalars['ID']>;
  /**
   * # Пользователь перешел в статус "онлайн"
   * ## Возвращает
   * Соответствующего пользователя
   * ## Доступ
   * Доставляется всем смежным пользователям
   * ## Мутации, генерирующие данное событие
   * - setClientStatus
   * - также безусловно генерируется при аутентификации, если статус изменился
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  userOnline: OnlineChangeResult;
  /**
   * # Пользователь перешел в статус "офлайн"
   * ## Возвращает
   * Соответствующего пользователя
   * ## Доступ
   * Доставляется всем смежным пользователям
   * ## Мутации, генерирующие данное событие
   * - setClientStatus
   * - также безусловно генерируется при аутентификации, если статус изменился
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  userOffline: OnlineChangeResult;
  /**
   * # Участник чата набирает текст
   * Если chat_id передан, то оповещение происходит только для
   * явно переданного чата, иначе для всех чатов, в которых
   * участвует пользователь.
   * ## Возвращает
   * Грань пользователь/чат
   * ## Доступ
   * Доставляется всем активным участникам чата
   * ## Мутации, генерирующие данное событие
   * - typing
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  typing: ActiveChatMember;
  /**
   * # Тег создана
   * ## Возвращает
   * Вновь созданную группу
   * ## Доступ
   * Доставляется всем клиентам, пользователя создавшего тег
   * ## Мутации, генерирующие данное событие
   * - newTag
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  tagCreated: Tag;
  /**
   * # Тег обновлен
   * ## Возвращает
   * Вновь обновленную группу
   * ## Доступ
   * Доставляется всем клиентам, пользователя - создателя тег
   * ## Мутации, генерирующие данное событие
   * - updateTag
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  tagUpdated: Tag;
  /**
   * # Тег удален
   * ## Возвращает
   * Идентификатор удаленного тега
   * ## Доступ
   * Доставляется всем клиентам, пользователя - создателя тега
   * ## Мутации, генерирующие данное событие
   * - deleteTag
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  tagDeleted: Scalars['ID'];
  /**
   * # У задачи установлены теги
   * ## Возвращает
   * Задачу
   * ## Доступ
   * Доставляется всем клиентам, пользователя, установившего теги
   * ## Мутации, генерирующие данное событие
   * - setIssueTags
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  issueTagsSetted: Issue;
  /**
   * # Дело создано
   * ## Возвращает
   * Вновь созданное дело
   * ## Доступ
   * Доставляется всем участникам чата, связанного с делом
   * ## Мутации, генерирующие данное событие
   * - newTodo
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  todoCreated: Todo;
  /**
   * # Дело удалено
   * ## Возвращает
   * Удаленное дело
   * ## Доступ
   * Доставляется всем участникам чата, связанного с делом
   * ## Мутации, генерирующие данное событие
   * - deleteTodo
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  todoDeleted: Todo;
  /**
   * # Дело обновлено
   * ## Возвращает
   * Обновленное дело
   * ## Доступ
   * Доставляется всем участникам чата, связанного с делом
   * ## Мутации, генерирующие данное событие
   * - updateTodo
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  todoUpdated: Todo;
  /**
   * # Пользователь обновлен
   * ## Возвращает
   * Обновленный пользователь
   * ## Доступ
   * Доставляется всем [смежным пользователям](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)
   * ## Мутации, генерирующие данное событие
   * - updateMe
   * - verifyPhone
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  userUpdated: ActiveUser;
  /**
   * # Создано напоминание
   * ## Возвращает
   * Вновь созданное напоминание
   * ## Доступ
   * Доставляется всем участникам напоминания
   * ## Мутации, генерирующие данное событие
   * - newReminder
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  reminderCreated: Reminder;
  /**
   * # Напоминание обновлено
   * ## Возвращает
   * Обновленное напоминание
   * ## Доступ
   * Доставляется всем участникам напоминания
   * ## Мутации, генерирующие данное событие
   * - updateReminder
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  reminderUpdated: Reminder;
  /**
   * # Напоминание активировано
   * ## Возвращает
   * Напоминание, срок которого подошел
   * ## Доступ
   * Доставляется всем участникам напоминания
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  reminderActivated: Reminder;
  /**
   * # Напоминания удалены
   * ## Возвращает
   * Идентификаторы удаленных напоминаний
   * ## Доступ
   * Доставляется всем участникам напоминания
   * ## Мутации, генерирующие данное событие
   * - deleteReminders
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  remindersDeleted: Array<Scalars['ID']>;
  /**
   * # В напоминание добавлен пользователь
   * ## Возвращает
   * Грань пользователь/напоминание
   * ## Доступ
   * Доставляется всем участникам, соответствующего напоминания
   * ## Мутации, генерирующие данное событие
   * - addUserToReminder
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  userAddedToReminder: ReminderMember;
  /**
   * # Из напоминания удален пользователь
   * ## Возвращает
   * Грань пользователь/напоминание
   * ## Доступ
   * Доставляется всем участникам, соответствующего напоминания
   * ## Мутации, генерирующие данное событие
   * - removeUserFromReminder
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  userRemovedFromReminder: RemoveUserFromReminderResult;
  /**
   * # Пользователи добавлены в контакты
   * ## Возвращает
   * Список пользователей, добавленных в контакты
   * ## Доступ
   * Доставляется всем клиентам, добавившего
   * ## Мутации, генерирующие данное событие
   * - addContact
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  contactsAdded: Array<User>;
  /**
   * # Пользователь удалён из контактов
   * ## Возвращает
   * Идентификатор пользователя, удаленный из контактов
   * ## Доступ
   * Доставляется всем клиентам, удалившего
   * ## Мутации, генерирующие данное событие
   * - removeContact
   * ## Ошибки
   * - *401 Unauthorized*, пользователь не аутентифицирован или не активен
   */
  contactRemoved: Scalars['ID'];
};


export type SubscriptionFUserAddedToChatArgs = {
  me_is_subject?: Maybe<Scalars['Boolean']>;
};


export type SubscriptionTypingArgs = {
  chat_id?: Maybe<Scalars['ID']>;
};

/** Тэг задачи */
export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  title: Scalars['String'];
  color: Scalars['Int'];
  issues: IssueConnection;
};

export type TagConnection = {
  __typename?: 'TagConnection';
  pageInfo: PageInfo;
  edges: Array<TagEdge>;
};

export type TagEdge = {
  __typename?: 'TagEdge';
  node: Tag;
  cursor: Scalars['String'];
};

/** Подзадача */
export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  /** описание задачи */
  caption: Scalars['String'];
  /** название задачи */
  title: Scalars['String'];
  /** индекс сортировки */
  rank: Scalars['LexoRank'];
  /** состаяние задачи */
  state: TodoState;
  /** дата создания задачи */
  created_at: Scalars['DateTime'];
  /** дата завершения */
  end_date?: Maybe<Scalars['DateTime']>;
  /** дата начала */
  start_date: Scalars['DateTime'];
  /** чат */
  chat: IChat;
};

export type TodoConnection = {
  __typename?: 'TodoConnection';
  pageInfo: PageInfo;
  edges: Array<TodoEdge>;
};

export type TodoEdge = {
  __typename?: 'TodoEdge';
  node: Todo;
  cursor: Scalars['String'];
};

/** статус подзадачи */
export enum TodoState {
  /** подзадача активна */
  Active = 'ACTIVE',
  /** подзадача закрыта */
  Closed = 'CLOSED'
}

export type UpdateChatInput = {
  /** название задачи */
  title?: Maybe<Scalars['String']>;
  /** описание задачи */
  caption?: Maybe<Scalars['String']>;
  /**
   * *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*
   * уровень назойливости событий чата,
   */
  notification?: Maybe<ChatNotificationState>;
  /**
   * *[несобственное поле](https://gudexco.atlassian.net/wiki/spaces/PD/pages/294913)*    Ограничить состояние notification датой, например - отлючить звук до...
   * Если устанавливаетсу notification_disabled_till,
   * то при наступлении указанного времени,
   * состояние notification снова возвращается в ON.
   * При наступлении указанного времени,
   * придет сабскрипшн chatUpdated,
   * где будет notification = 'ON', notification_disabled_till = null .
   */
  notification_disabled_till?: Maybe<Scalars['DateTime']>;
  /** чат скрыт *поле индивидуально для пользователя* */
  hidden?: Maybe<Scalars['Boolean']>;
  /** индекс сортировки *поле индивидуально для пользователя* */
  rank?: Maybe<Scalars['LexoRank']>;
};

export type UpdateGroupInput = {
  /** заголовок группы */
  title?: Maybe<Scalars['String']>;
  /** индекс сортировки */
  rank?: Maybe<Scalars['LexoRank']>;
};

export type UpdateIssueInput = {
  /** дата завершения */
  end_date?: Maybe<Scalars['DateTime']>;
  /** дата начала */
  start_date?: Maybe<Scalars['DateTime']>;
  /** id исполнителя */
  executor_user_id?: Maybe<Scalars['ID']>;
  /** id группы */
  group_id?: Maybe<Scalars['ID']>;
  /** индекс сортировки *поле индивидуально для пользователя* */
  rank?: Maybe<Scalars['LexoRank']>;
};

export type UpdateMessageInput = {
  /** текст сообщения */
  message: Scalars['String'];
};

export type UpdateReminderInput = {
  /** название задачи */
  title?: Maybe<Scalars['String']>;
  /** время срабатывания напоминания */
  timestamp?: Maybe<Scalars['DateTime']>;
};

export type UpdateReviewInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  grades?: Maybe<GradesInput>;
};

export type UpdateTagInput = {
  title?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['Int']>;
};

export type UpdateTodoInput = {
  /** описание задачи */
  caption?: Maybe<Scalars['String']>;
  /** состаяние задачи */
  state?: Maybe<TodoState>;
  /** название задачи */
  title?: Maybe<Scalars['String']>;
  /** индекс сортировки */
  rank?: Maybe<Scalars['LexoRank']>;
  /** дата завершения */
  end_date?: Maybe<Scalars['DateTime']>;
  /** дата начала */
  start_date?: Maybe<Scalars['DateTime']>;
};

export type UpdateUserInput = {
  /** профиль пользователя */
  profile: UserProfileUpdateInput;
};

export type User = ActiveUser | InvitedUser;

export type UserConnection = {
  __typename?: 'UserConnection';
  pageInfo: PageInfo;
  edges: Array<UserEdge>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  node: User;
  cursor: Scalars['String'];
};

/** Аватар пользователя */
export type UserImage = IFile & {
  __typename?: 'UserImage';
  /** id файла */
  id: Scalars['ID'];
  /** выбранная пользователем зона изображения */
  area?: Maybe<ImageArea>;
  /** ключ на s3 */
  key: Scalars['String'];
  /** дата загрузки файла */
  timestamp: Scalars['DateTime'];
  /** url оригинала */
  url: Scalars['String'];
  /** размер файла */
  content_length: Scalars['LongInt'];
  /** mime-тип */
  content_type: Scalars['String'];
};

export type UserImageUploadedResult = {
  __typename?: 'UserImageUploadedResult';
  /** идентификатор пользователя, для которого загружено изображение */
  user_id: Scalars['ID'];
  /** аватар */
  image: UserImage;
};

/** профиль активного пользователя */
export type UserProfile = {
  __typename?: 'UserProfile';
  /** email пользователя */
  email: Scalars['Email'];
  /** имя */
  first_name: Scalars['String'];
  /** фамилия */
  last_name: Scalars['String'];
  /** специальность */
  job_title?: Maybe<Scalars['String']>;
  /** город */
  city?: Maybe<Scalars['String']>;
  /** пол */
  gender: Gender;
  /** склонения */
  declension?: Maybe<UserProfileDeclension>;
};

/** склонения города пользователя */
export type UserProfileCityDeclension = {
  __typename?: 'UserProfileCityDeclension';
  /** в Санкт-петербурге */
  in?: Maybe<Scalars['String']>;
  /** из Санкт-Петербурга */
  from?: Maybe<Scalars['String']>;
  /** в Санкт-Петербург */
  to?: Maybe<Scalars['String']>;
};

/** склонения профиля пользователя */
export type UserProfileDeclension = {
  __typename?: 'UserProfileDeclension';
  /** склонения города пользователя */
  city?: Maybe<UserProfileCityDeclension>;
  /** склонения имени */
  first_name?: Maybe<Declention>;
  /** склонения фамилии */
  last_name?: Maybe<Declention>;
};

export type UserProfileUpdateInput = {
  /** email пользователя */
  email?: Maybe<Scalars['Email']>;
  /** имя */
  first_name?: Maybe<Scalars['String']>;
  /** фамилия */
  last_name?: Maybe<Scalars['String']>;
  /** специальность */
  job_title?: Maybe<Scalars['String']>;
  /** город */
  city?: Maybe<Scalars['String']>;
};

export type UserReviewsConnection = {
  __typename?: 'UserReviewsConnection';
  pageInfo: PageInfo;
  edges: Array<UserReviewsEdge>;
  /** Средняя оценка серди всех отзывов */
  mean_grade?: Maybe<Scalars['Float']>;
  /** Средние оценки по категория */
  mean_grades_detail?: Maybe<MeanGradesDetail>;
  /** Общее количество отзывов */
  count: Scalars['Int'];
  /** Пользователь имеет отзыв от текущего пользователя */
  my_review?: Maybe<Review>;
};

export type UserReviewsEdge = {
  __typename?: 'UserReviewsEdge';
  node: Review;
  cursor: Scalars['String'];
};

export type UsersWithReviewConnection = {
  __typename?: 'UsersWithReviewConnection';
  pageInfo: PageInfo;
  edges: Array<UsersWithReviewEdge>;
};

export type UsersWithReviewEdge = {
  __typename?: 'UsersWithReviewEdge';
  node: IUser;
  cursor: Scalars['String'];
};

export type Void = {
  __typename?: 'Void';
  _?: Maybe<Scalars['Boolean']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ActiveChatMember: ResolverTypeWrapper<ActiveChatMember>;
  ActiveUser: ResolverTypeWrapper<ActiveUser>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AddUserToChatResult: ResolverTypeWrapper<AddUserToChatResult>;
  AttachedFile: ResolverTypeWrapper<AttachedFile>;
  AttachedFileConnection: ResolverTypeWrapper<AttachedFileConnection>;
  AttachedFileEdge: ResolverTypeWrapper<AttachedFileEdge>;
  AuthToken: ResolverTypeWrapper<AuthToken>;
  Bookmark: ResolverTypeWrapper<Scalars['Bookmark']>;
  Chat: ResolverTypeWrapper<Omit<Chat, 'creator'> & { creator: ResolversTypes['RegisteredUser'] }>;
  ChatFavoriteMessagesConnection: ResolverTypeWrapper<ChatFavoriteMessagesConnection>;
  ChatFilesFilterInput: ChatFilesFilterInput;
  ChatForwardMessageConnection: ResolverTypeWrapper<ChatForwardMessageConnection>;
  ChatFrowardMessageEdge: ResolverTypeWrapper<ChatFrowardMessageEdge>;
  ChatImage: ResolverTypeWrapper<ChatImage>;
  ChatImageUploadedResult: ResolverTypeWrapper<ChatImageUploadedResult>;
  ChatMember: ResolverTypeWrapper<Omit<ChatMember, 'user'> & { user: ResolversTypes['User'] }>;
  ChatNotificationState: ChatNotificationState;
  ChatState: ChatState;
  ChatUsersStateFilter: ChatUsersStateFilter;
  ChatsFilterInput: ChatsFilterInput;
  CheckStatus: ResolverTypeWrapper<CheckStatus>;
  ContactUsersConnection: ResolverTypeWrapper<ContactUsersConnection>;
  ContactUsersEdge: ResolverTypeWrapper<Omit<ContactUsersEdge, 'node'> & { node: ResolversTypes['User'] }>;
  CreateChatResult: ResolverTypeWrapper<CreateChatResult>;
  CreateReviewInput: CreateReviewInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Declention: ResolverTypeWrapper<Declention>;
  DeletedMessage: ResolverTypeWrapper<DeletedMessage>;
  DraftSetResult: ResolverTypeWrapper<DraftSetResult>;
  Email: ResolverTypeWrapper<Scalars['Email']>;
  ErrorType: ErrorType;
  FileMessage: ResolverTypeWrapper<Omit<FileMessage, 'user' | 'quoted_message'> & { user: ResolversTypes['RegisteredUser'], quoted_message?: Maybe<ResolversTypes['QuotedMessage']> }>;
  FileType: FileType;
  ForwardMessage: ResolverTypeWrapper<Omit<ForwardMessage, 'user' | 'forwarded_message'> & { user: ResolversTypes['RegisteredUser'], forwarded_message: ResolversTypes['ForwardedMessage'] }>;
  ForwardedMessage: ResolversTypes['FileMessage'] | ResolversTypes['RegularMessage'] | ResolversTypes['DeletedMessage'];
  Gender: Gender;
  Grade: ResolverTypeWrapper<Scalars['Grade']>;
  Grades: ResolverTypeWrapper<Grades>;
  GradesInput: GradesInput;
  Group: ResolverTypeWrapper<Group>;
  GroupConnection: ResolverTypeWrapper<GroupConnection>;
  GroupEdge: ResolverTypeWrapper<GroupEdge>;
  GroupState: GroupState;
  IChat: ResolversTypes['Chat'] | ResolversTypes['PrivateChat'];
  IChatConnection: ResolverTypeWrapper<IChatConnection>;
  IChatEdge: ResolverTypeWrapper<IChatEdge>;
  IChatMessageConnection: ResolverTypeWrapper<IChatMessageConnection>;
  IChatMessageEdge: ResolverTypeWrapper<IChatMessageEdge>;
  IChatNootificationMessageEdge: ResolverTypeWrapper<IChatNootificationMessageEdge>;
  IChatUserConnection: ResolverTypeWrapper<IChatUserConnection>;
  IChatUserEdge: ResolverTypeWrapper<Omit<IChatUserEdge, 'node'> & { node: ResolversTypes['User'] }>;
  IFile: ResolversTypes['AttachedFile'] | ResolversTypes['ChatImage'] | ResolversTypes['MessageFile'] | ResolversTypes['UserImage'];
  IMessage: ResolversTypes['FileMessage'] | ResolversTypes['ForwardMessage'] | ResolversTypes['NotificationMessage'] | ResolversTypes['RegularMessage'];
  IMessageConnection: ResolverTypeWrapper<IMessageConnection>;
  IMessageEdge: ResolverTypeWrapper<IMessageEdge>;
  INotificationText: ResolversTypes['NotificationText'] | ResolversTypes['NotificationTodo'] | ResolversTypes['NotificationUser'];
  IUser: ResolversTypes['ActiveUser'] | ResolversTypes['InvitedUser'];
  ImageArea: ResolverTypeWrapper<ImageArea>;
  ImageAreaInput: ImageAreaInput;
  InviteActResult: ResolverTypeWrapper<InviteActResult>;
  InviteRequestResult: ResolverTypeWrapper<Omit<InviteRequestResult, 'existing_user'> & { existing_user?: Maybe<ResolversTypes['User']> }>;
  InvitedUser: ResolverTypeWrapper<InvitedUser>;
  Issue: ResolverTypeWrapper<Omit<Issue, 'executor'> & { executor?: Maybe<ResolversTypes['User']> }>;
  IssueConnection: ResolverTypeWrapper<IssueConnection>;
  IssueEdge: ResolverTypeWrapper<IssueEdge>;
  IssueSearchConnection: ResolverTypeWrapper<IssueSearchConnection>;
  IssueSearchEdge: ResolverTypeWrapper<IssueSearchEdge>;
  IssuesFilterInput: IssuesFilterInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LexoRank: ResolverTypeWrapper<Scalars['LexoRank']>;
  LinkInfo: ResolverTypeWrapper<LinkInfo>;
  LinkInfoConnection: ResolverTypeWrapper<LinkInfoConnection>;
  LinkInfoEdge: ResolverTypeWrapper<LinkInfoEdge>;
  Locale: Locale;
  LongInt: ResolverTypeWrapper<Scalars['LongInt']>;
  MakeOTPResult: ResolverTypeWrapper<MakeOtpResult>;
  MakePosibleContactsConnection: ResolverTypeWrapper<MakePosibleContactsConnection>;
  MakePosibleContactsEdge: ResolverTypeWrapper<Omit<MakePosibleContactsEdge, 'node'> & { node?: Maybe<ResolversTypes['User']> }>;
  MeanGradesDetail: ResolverTypeWrapper<MeanGradesDetail>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  MessageFile: ResolverTypeWrapper<MessageFile>;
  MessageFileConnection: ResolverTypeWrapper<MessageFileConnection>;
  MessageFileEdge: ResolverTypeWrapper<MessageFileEdge>;
  Mutation: ResolverTypeWrapper<{}>;
  MyUser: ResolversTypes['ActiveUser'] | ResolversTypes['RegisteringUser'];
  NewChatInput: NewChatInput;
  NewFileMessageInput: NewFileMessageInput;
  NewGroupInput: NewGroupInput;
  NewIssueInput: NewIssueInput;
  NewMessageInput: NewMessageInput;
  NewPrivateChatInput: NewPrivateChatInput;
  NewReminderInput: NewReminderInput;
  NewTagInput: NewTagInput;
  NewTextMessageInput: NewTextMessageInput;
  NewTodoInput: NewTodoInput;
  NotificationDSL: ResolversTypes['NotificationText'] | ResolversTypes['NotificationUser'] | ResolversTypes['NotificationTodo'];
  NotificationMessage: ResolverTypeWrapper<Omit<NotificationMessage, 'user' | 'data'> & { user: ResolversTypes['RegisteredUser'], data: Array<ResolversTypes['NotificationDSL']> }>;
  NotificationText: ResolverTypeWrapper<NotificationText>;
  NotificationTodo: ResolverTypeWrapper<NotificationTodo>;
  NotificationUser: ResolverTypeWrapper<NotificationUser>;
  Null: ResolverTypeWrapper<Scalars['Null']>;
  OTPToTokenResult: ResolverTypeWrapper<Omit<OtpToTokenResult, 'me'> & { me: ResolversTypes['MyUser'] }>;
  OnlineChangeResult: ResolverTypeWrapper<OnlineChangeResult>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  PresignChatImageInput: PresignChatImageInput;
  PresignMessageFileInput: PresignMessageFileInput;
  PresignUserImageInput: PresignUserImageInput;
  PresignedField: ResolverTypeWrapper<PresignedField>;
  PresignedRequest: ResolverTypeWrapper<PresignedRequest>;
  PrivateChat: ResolverTypeWrapper<Omit<PrivateChat, 'another_user'> & { another_user: ResolversTypes['User'] }>;
  Query: ResolverTypeWrapper<{}>;
  QuotedMessage: ResolversTypes['FileMessage'] | ResolversTypes['RegularMessage'] | ResolversTypes['ForwardMessage'] | ResolversTypes['DeletedMessage'];
  RegisterUserInput: RegisterUserInput;
  RegisteredUser: ResolversTypes['ActiveUser'];
  RegisteringUser: ResolverTypeWrapper<RegisteringUser>;
  RegisteringUserImageUploadedResult: ResolverTypeWrapper<RegisteringUserImageUploadedResult>;
  RegistrationStep: RegistrationStep;
  RegularMessage: ResolverTypeWrapper<Omit<RegularMessage, 'user' | 'quoted_message'> & { user: ResolversTypes['RegisteredUser'], quoted_message?: Maybe<ResolversTypes['QuotedMessage']> }>;
  Reminder: ResolverTypeWrapper<Omit<Reminder, 'creator'> & { creator: ResolversTypes['RegisteredUser'] }>;
  ReminderConnection: ResolverTypeWrapper<ReminderConnection>;
  ReminderEdge: ResolverTypeWrapper<ReminderEdge>;
  ReminderFilterInput: ReminderFilterInput;
  ReminderMember: ResolverTypeWrapper<Omit<ReminderMember, 'user'> & { user: ResolversTypes['User'] }>;
  ReminderUserConnection: ResolverTypeWrapper<ReminderUserConnection>;
  ReminderUserEdge: ResolverTypeWrapper<Omit<ReminderUserEdge, 'node'> & { node: ResolversTypes['User'] }>;
  RemoveUserFromReminderResult: ResolverTypeWrapper<RemoveUserFromReminderResult>;
  Review: ResolverTypeWrapper<Review>;
  RootUserConnection: ResolverTypeWrapper<RootUserConnection>;
  RootUserEdge: ResolverTypeWrapper<Omit<RootUserEdge, 'node'> & { node: ResolversTypes['User'] }>;
  SearchMessageFilter: SearchMessageFilter;
  SearchMessageWhere: SearchMessageWhere;
  SearchMessagesConnection: ResolverTypeWrapper<SearchMessagesConnection>;
  SearchMessagesEdge: ResolverTypeWrapper<SearchMessagesEdge>;
  Settings: ResolverTypeWrapper<Settings>;
  Subscription: ResolverTypeWrapper<{}>;
  Tag: ResolverTypeWrapper<Tag>;
  TagConnection: ResolverTypeWrapper<TagConnection>;
  TagEdge: ResolverTypeWrapper<TagEdge>;
  Todo: ResolverTypeWrapper<Todo>;
  TodoConnection: ResolverTypeWrapper<TodoConnection>;
  TodoEdge: ResolverTypeWrapper<TodoEdge>;
  TodoState: TodoState;
  UpdateChatInput: UpdateChatInput;
  UpdateGroupInput: UpdateGroupInput;
  UpdateIssueInput: UpdateIssueInput;
  UpdateMessageInput: UpdateMessageInput;
  UpdateReminderInput: UpdateReminderInput;
  UpdateReviewInput: UpdateReviewInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTodoInput: UpdateTodoInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolversTypes['ActiveUser'] | ResolversTypes['InvitedUser'];
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserEdge: ResolverTypeWrapper<Omit<UserEdge, 'node'> & { node: ResolversTypes['User'] }>;
  UserImage: ResolverTypeWrapper<UserImage>;
  UserImageUploadedResult: ResolverTypeWrapper<UserImageUploadedResult>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
  UserProfileCityDeclension: ResolverTypeWrapper<UserProfileCityDeclension>;
  UserProfileDeclension: ResolverTypeWrapper<UserProfileDeclension>;
  UserProfileUpdateInput: UserProfileUpdateInput;
  UserReviewsConnection: ResolverTypeWrapper<UserReviewsConnection>;
  UserReviewsEdge: ResolverTypeWrapper<UserReviewsEdge>;
  UsersWithReviewConnection: ResolverTypeWrapper<UsersWithReviewConnection>;
  UsersWithReviewEdge: ResolverTypeWrapper<UsersWithReviewEdge>;
  Void: ResolverTypeWrapper<Void>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ActiveChatMember: ActiveChatMember;
  ActiveUser: ActiveUser;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  AddUserToChatResult: AddUserToChatResult;
  AttachedFile: AttachedFile;
  AttachedFileConnection: AttachedFileConnection;
  AttachedFileEdge: AttachedFileEdge;
  AuthToken: AuthToken;
  Bookmark: Scalars['Bookmark'];
  Chat: Omit<Chat, 'creator'> & { creator: ResolversParentTypes['RegisteredUser'] };
  ChatFavoriteMessagesConnection: ChatFavoriteMessagesConnection;
  ChatFilesFilterInput: ChatFilesFilterInput;
  ChatForwardMessageConnection: ChatForwardMessageConnection;
  ChatFrowardMessageEdge: ChatFrowardMessageEdge;
  ChatImage: ChatImage;
  ChatImageUploadedResult: ChatImageUploadedResult;
  ChatMember: Omit<ChatMember, 'user'> & { user: ResolversParentTypes['User'] };
  ChatsFilterInput: ChatsFilterInput;
  CheckStatus: CheckStatus;
  ContactUsersConnection: ContactUsersConnection;
  ContactUsersEdge: Omit<ContactUsersEdge, 'node'> & { node: ResolversParentTypes['User'] };
  CreateChatResult: CreateChatResult;
  CreateReviewInput: CreateReviewInput;
  DateTime: Scalars['DateTime'];
  Declention: Declention;
  DeletedMessage: DeletedMessage;
  DraftSetResult: DraftSetResult;
  Email: Scalars['Email'];
  FileMessage: Omit<FileMessage, 'user' | 'quoted_message'> & { user: ResolversParentTypes['RegisteredUser'], quoted_message?: Maybe<ResolversParentTypes['QuotedMessage']> };
  ForwardMessage: Omit<ForwardMessage, 'user' | 'forwarded_message'> & { user: ResolversParentTypes['RegisteredUser'], forwarded_message: ResolversParentTypes['ForwardedMessage'] };
  ForwardedMessage: ResolversParentTypes['FileMessage'] | ResolversParentTypes['RegularMessage'] | ResolversParentTypes['DeletedMessage'];
  Grade: Scalars['Grade'];
  Grades: Grades;
  GradesInput: GradesInput;
  Group: Group;
  GroupConnection: GroupConnection;
  GroupEdge: GroupEdge;
  IChat: ResolversParentTypes['Chat'] | ResolversParentTypes['PrivateChat'];
  IChatConnection: IChatConnection;
  IChatEdge: IChatEdge;
  IChatMessageConnection: IChatMessageConnection;
  IChatMessageEdge: IChatMessageEdge;
  IChatNootificationMessageEdge: IChatNootificationMessageEdge;
  IChatUserConnection: IChatUserConnection;
  IChatUserEdge: Omit<IChatUserEdge, 'node'> & { node: ResolversParentTypes['User'] };
  IFile: ResolversParentTypes['AttachedFile'] | ResolversParentTypes['ChatImage'] | ResolversParentTypes['MessageFile'] | ResolversParentTypes['UserImage'];
  IMessage: ResolversParentTypes['FileMessage'] | ResolversParentTypes['ForwardMessage'] | ResolversParentTypes['NotificationMessage'] | ResolversParentTypes['RegularMessage'];
  IMessageConnection: IMessageConnection;
  IMessageEdge: IMessageEdge;
  INotificationText: ResolversParentTypes['NotificationText'] | ResolversParentTypes['NotificationTodo'] | ResolversParentTypes['NotificationUser'];
  IUser: ResolversParentTypes['ActiveUser'] | ResolversParentTypes['InvitedUser'];
  ImageArea: ImageArea;
  ImageAreaInput: ImageAreaInput;
  InviteActResult: InviteActResult;
  InviteRequestResult: Omit<InviteRequestResult, 'existing_user'> & { existing_user?: Maybe<ResolversParentTypes['User']> };
  InvitedUser: InvitedUser;
  Issue: Omit<Issue, 'executor'> & { executor?: Maybe<ResolversParentTypes['User']> };
  IssueConnection: IssueConnection;
  IssueEdge: IssueEdge;
  IssueSearchConnection: IssueSearchConnection;
  IssueSearchEdge: IssueSearchEdge;
  IssuesFilterInput: IssuesFilterInput;
  JSON: Scalars['JSON'];
  LexoRank: Scalars['LexoRank'];
  LinkInfo: LinkInfo;
  LinkInfoConnection: LinkInfoConnection;
  LinkInfoEdge: LinkInfoEdge;
  LongInt: Scalars['LongInt'];
  MakeOTPResult: MakeOtpResult;
  MakePosibleContactsConnection: MakePosibleContactsConnection;
  MakePosibleContactsEdge: Omit<MakePosibleContactsEdge, 'node'> & { node?: Maybe<ResolversParentTypes['User']> };
  MeanGradesDetail: MeanGradesDetail;
  Float: Scalars['Float'];
  MessageFile: MessageFile;
  MessageFileConnection: MessageFileConnection;
  MessageFileEdge: MessageFileEdge;
  Mutation: {};
  MyUser: ResolversParentTypes['ActiveUser'] | ResolversParentTypes['RegisteringUser'];
  NewChatInput: NewChatInput;
  NewFileMessageInput: NewFileMessageInput;
  NewGroupInput: NewGroupInput;
  NewIssueInput: NewIssueInput;
  NewMessageInput: NewMessageInput;
  NewPrivateChatInput: NewPrivateChatInput;
  NewReminderInput: NewReminderInput;
  NewTagInput: NewTagInput;
  NewTextMessageInput: NewTextMessageInput;
  NewTodoInput: NewTodoInput;
  NotificationDSL: ResolversParentTypes['NotificationText'] | ResolversParentTypes['NotificationUser'] | ResolversParentTypes['NotificationTodo'];
  NotificationMessage: Omit<NotificationMessage, 'user' | 'data'> & { user: ResolversParentTypes['RegisteredUser'], data: Array<ResolversParentTypes['NotificationDSL']> };
  NotificationText: NotificationText;
  NotificationTodo: NotificationTodo;
  NotificationUser: NotificationUser;
  Null: Scalars['Null'];
  OTPToTokenResult: Omit<OtpToTokenResult, 'me'> & { me: ResolversParentTypes['MyUser'] };
  OnlineChangeResult: OnlineChangeResult;
  PageInfo: PageInfo;
  PhoneNumber: Scalars['PhoneNumber'];
  PresignChatImageInput: PresignChatImageInput;
  PresignMessageFileInput: PresignMessageFileInput;
  PresignUserImageInput: PresignUserImageInput;
  PresignedField: PresignedField;
  PresignedRequest: PresignedRequest;
  PrivateChat: Omit<PrivateChat, 'another_user'> & { another_user: ResolversParentTypes['User'] };
  Query: {};
  QuotedMessage: ResolversParentTypes['FileMessage'] | ResolversParentTypes['RegularMessage'] | ResolversParentTypes['ForwardMessage'] | ResolversParentTypes['DeletedMessage'];
  RegisterUserInput: RegisterUserInput;
  RegisteredUser: ResolversParentTypes['ActiveUser'];
  RegisteringUser: RegisteringUser;
  RegisteringUserImageUploadedResult: RegisteringUserImageUploadedResult;
  RegularMessage: Omit<RegularMessage, 'user' | 'quoted_message'> & { user: ResolversParentTypes['RegisteredUser'], quoted_message?: Maybe<ResolversParentTypes['QuotedMessage']> };
  Reminder: Omit<Reminder, 'creator'> & { creator: ResolversParentTypes['RegisteredUser'] };
  ReminderConnection: ReminderConnection;
  ReminderEdge: ReminderEdge;
  ReminderFilterInput: ReminderFilterInput;
  ReminderMember: Omit<ReminderMember, 'user'> & { user: ResolversParentTypes['User'] };
  ReminderUserConnection: ReminderUserConnection;
  ReminderUserEdge: Omit<ReminderUserEdge, 'node'> & { node: ResolversParentTypes['User'] };
  RemoveUserFromReminderResult: RemoveUserFromReminderResult;
  Review: Review;
  RootUserConnection: RootUserConnection;
  RootUserEdge: Omit<RootUserEdge, 'node'> & { node: ResolversParentTypes['User'] };
  SearchMessageFilter: SearchMessageFilter;
  SearchMessagesConnection: SearchMessagesConnection;
  SearchMessagesEdge: SearchMessagesEdge;
  Settings: Settings;
  Subscription: {};
  Tag: Tag;
  TagConnection: TagConnection;
  TagEdge: TagEdge;
  Todo: Todo;
  TodoConnection: TodoConnection;
  TodoEdge: TodoEdge;
  UpdateChatInput: UpdateChatInput;
  UpdateGroupInput: UpdateGroupInput;
  UpdateIssueInput: UpdateIssueInput;
  UpdateMessageInput: UpdateMessageInput;
  UpdateReminderInput: UpdateReminderInput;
  UpdateReviewInput: UpdateReviewInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTodoInput: UpdateTodoInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolversParentTypes['ActiveUser'] | ResolversParentTypes['InvitedUser'];
  UserConnection: UserConnection;
  UserEdge: Omit<UserEdge, 'node'> & { node: ResolversParentTypes['User'] };
  UserImage: UserImage;
  UserImageUploadedResult: UserImageUploadedResult;
  UserProfile: UserProfile;
  UserProfileCityDeclension: UserProfileCityDeclension;
  UserProfileDeclension: UserProfileDeclension;
  UserProfileUpdateInput: UserProfileUpdateInput;
  UserReviewsConnection: UserReviewsConnection;
  UserReviewsEdge: UserReviewsEdge;
  UsersWithReviewConnection: UsersWithReviewConnection;
  UsersWithReviewEdge: UsersWithReviewEdge;
  Void: Void;
};

export type ActiveChatMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActiveChatMember'] = ResolversParentTypes['ActiveChatMember']> = {
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['ActiveUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActiveUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActiveUser'] = ResolversParentTypes['ActiveUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  is_my?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  is_operator?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  join_date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  last_seen?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  online?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['UserImage']>, ParentType, ContextType>;
  is_contact?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reviews?: Resolver<ResolversTypes['UserReviewsConnection'], ParentType, ContextType, RequireFields<ActiveUserReviewsArgs, 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddUserToChatResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddUserToChatResult'] = ResolversParentTypes['AddUserToChatResult']> = {
  createdNotificationMessage?: Resolver<ResolversTypes['IChatNootificationMessageEdge'], ParentType, ContextType>;
  createdChatUserEdge?: Resolver<ResolversTypes['ChatMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttachedFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttachedFile'] = ResolversParentTypes['AttachedFile']> = {
  attached_to?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FileType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content_length?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  content_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  file_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttachedFileConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttachedFileConnection'] = ResolversParentTypes['AttachedFileConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['AttachedFileEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttachedFileEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttachedFileEdge'] = ResolversParentTypes['AttachedFileEdge']> = {
  node?: Resolver<ResolversTypes['AttachedFile'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthToken'] = ResolversParentTypes['AuthToken']> = {
  expiration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  expiration_date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BookmarkScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bookmark'], any> {
  name: 'Bookmark';
}

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  check_status?: Resolver<ResolversTypes['CheckStatus'], ParentType, ContextType>;
  draft?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  hidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['LexoRank']>, ParentType, ContextType>;
  notification?: Resolver<ResolversTypes['ChatNotificationState'], ParentType, ContextType>;
  notification_disabled_till?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['ChatState'], ParentType, ContextType>;
  caption?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  attached_files?: Resolver<ResolversTypes['AttachedFileConnection'], ParentType, ContextType, RequireFields<ChatAttached_FilesArgs, never>>;
  favorite_messages?: Resolver<ResolversTypes['ChatFavoriteMessagesConnection'], ParentType, ContextType, RequireFields<ChatFavorite_MessagesArgs, never>>;
  files?: Resolver<ResolversTypes['MessageFileConnection'], ParentType, ContextType, RequireFields<ChatFilesArgs, never>>;
  links?: Resolver<ResolversTypes['LinkInfoConnection'], ParentType, ContextType, RequireFields<ChatLinksArgs, never>>;
  messages?: Resolver<ResolversTypes['IChatMessageConnection'], ParentType, ContextType, RequireFields<ChatMessagesArgs, never>>;
  todos?: Resolver<ResolversTypes['TodoConnection'], ParentType, ContextType, RequireFields<ChatTodosArgs, never>>;
  users?: Resolver<ResolversTypes['IChatUserConnection'], ParentType, ContextType, RequireFields<ChatUsersArgs, never>>;
  image?: Resolver<Maybe<ResolversTypes['ChatImage']>, ParentType, ContextType>;
  issue?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['RegisteredUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatFavoriteMessagesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatFavoriteMessagesConnection'] = ResolversParentTypes['ChatFavoriteMessagesConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['IMessageEdge']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatForwardMessageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatForwardMessageConnection'] = ResolversParentTypes['ChatForwardMessageConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['ChatFrowardMessageEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatFrowardMessageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatFrowardMessageEdge'] = ResolversParentTypes['ChatFrowardMessageEdge']> = {
  node?: Resolver<ResolversTypes['ForwardMessage'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmark?: Resolver<ResolversTypes['Bookmark'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatImage'] = ResolversParentTypes['ChatImage']> = {
  area?: Resolver<Maybe<ResolversTypes['ImageArea']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content_length?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  content_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatImageUploadedResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatImageUploadedResult'] = ResolversParentTypes['ChatImageUploadedResult']> = {
  chat_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['ChatImage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatMember'] = ResolversParentTypes['ChatMember']> = {
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckStatus'] = ResolversParentTypes['CheckStatus']> = {
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  unread_messages_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_viewed?: Resolver<ResolversTypes['Bookmark'], ParentType, ContextType>;
  my_last_viewed?: Resolver<ResolversTypes['Bookmark'], ParentType, ContextType>;
  mentioned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactUsersConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactUsersConnection'] = ResolversParentTypes['ContactUsersConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['ContactUsersEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactUsersEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactUsersEdge'] = ResolversParentTypes['ContactUsersEdge']> = {
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateChatResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateChatResult'] = ResolversParentTypes['CreateChatResult']> = {
  createdChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  createdIssue?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeclentionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Declention'] = ResolversParentTypes['Declention']> = {
  nominative?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genitive?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dative?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accusative?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instrumental?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prepositional?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletedMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeletedMessage'] = ResolversParentTypes['DeletedMessage']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftSetResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftSetResult'] = ResolversParentTypes['DraftSetResult']> = {
  chat_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  draft?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export type FileMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileMessage'] = ResolversParentTypes['FileMessage']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  is_favorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_my?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['RegisteredUser'], ParentType, ContextType>;
  viewed_by?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  file?: Resolver<ResolversTypes['MessageFile'], ParentType, ContextType>;
  quoted_message?: Resolver<Maybe<ResolversTypes['QuotedMessage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForwardMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForwardMessage'] = ResolversParentTypes['ForwardMessage']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  is_favorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_my?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['RegisteredUser'], ParentType, ContextType>;
  viewed_by?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  forwarded_message?: Resolver<ResolversTypes['ForwardedMessage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForwardedMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForwardedMessage'] = ResolversParentTypes['ForwardedMessage']> = {
  __resolveType: TypeResolveFn<'FileMessage' | 'RegularMessage' | 'DeletedMessage', ParentType, ContextType>;
};

export interface GradeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Grade'], any> {
  name: 'Grade';
}

export type GradesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Grades'] = ResolversParentTypes['Grades']> = {
  quality?: Resolver<ResolversTypes['Grade'], ParentType, ContextType>;
  communication?: Resolver<ResolversTypes['Grade'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Grade'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['LexoRank'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['GroupState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupConnection'] = ResolversParentTypes['GroupConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['GroupEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupEdge'] = ResolversParentTypes['GroupEdge']> = {
  node?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['IChat'] = ResolversParentTypes['IChat']> = {
  __resolveType: TypeResolveFn<'Chat' | 'PrivateChat', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  check_status?: Resolver<ResolversTypes['CheckStatus'], ParentType, ContextType>;
  draft?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  hidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['LexoRank']>, ParentType, ContextType>;
  notification?: Resolver<ResolversTypes['ChatNotificationState'], ParentType, ContextType>;
  notification_disabled_till?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  attached_files?: Resolver<ResolversTypes['AttachedFileConnection'], ParentType, ContextType, RequireFields<IChatAttached_FilesArgs, never>>;
  favorite_messages?: Resolver<ResolversTypes['ChatFavoriteMessagesConnection'], ParentType, ContextType, RequireFields<IChatFavorite_MessagesArgs, never>>;
  files?: Resolver<ResolversTypes['MessageFileConnection'], ParentType, ContextType, RequireFields<IChatFilesArgs, never>>;
  links?: Resolver<ResolversTypes['LinkInfoConnection'], ParentType, ContextType, RequireFields<IChatLinksArgs, never>>;
  messages?: Resolver<ResolversTypes['IChatMessageConnection'], ParentType, ContextType, RequireFields<IChatMessagesArgs, never>>;
  todos?: Resolver<ResolversTypes['TodoConnection'], ParentType, ContextType, RequireFields<IChatTodosArgs, never>>;
  users?: Resolver<ResolversTypes['IChatUserConnection'], ParentType, ContextType, RequireFields<IChatUsersArgs, never>>;
};

export type IChatConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IChatConnection'] = ResolversParentTypes['IChatConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['IChatEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IChatEdge'] = ResolversParentTypes['IChatEdge']> = {
  node?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatMessageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IChatMessageConnection'] = ResolversParentTypes['IChatMessageConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['IChatMessageEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatMessageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IChatMessageEdge'] = ResolversParentTypes['IChatMessageEdge']> = {
  node?: Resolver<ResolversTypes['IMessage'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmark?: Resolver<ResolversTypes['Bookmark'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatNootificationMessageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IChatNootificationMessageEdge'] = ResolversParentTypes['IChatNootificationMessageEdge']> = {
  node?: Resolver<ResolversTypes['NotificationMessage'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmark?: Resolver<ResolversTypes['Bookmark'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatUserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IChatUserConnection'] = ResolversParentTypes['IChatUserConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['IChatUserEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatUserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IChatUserEdge'] = ResolversParentTypes['IChatUserEdge']> = {
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['IFile'] = ResolversParentTypes['IFile']> = {
  __resolveType: TypeResolveFn<'AttachedFile' | 'ChatImage' | 'MessageFile' | 'UserImage', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content_length?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  content_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type IMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['IMessage'] = ResolversParentTypes['IMessage']> = {
  __resolveType: TypeResolveFn<'FileMessage' | 'ForwardMessage' | 'NotificationMessage' | 'RegularMessage', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  is_favorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_my?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['RegisteredUser'], ParentType, ContextType>;
  viewed_by?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
};

export type IMessageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IMessageConnection'] = ResolversParentTypes['IMessageConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['IMessageEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IMessageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IMessageEdge'] = ResolversParentTypes['IMessageEdge']> = {
  node?: Resolver<ResolversTypes['IMessage'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type INotificationTextResolvers<ContextType = any, ParentType extends ResolversParentTypes['INotificationText'] = ResolversParentTypes['INotificationText']> = {
  __resolveType: TypeResolveFn<'NotificationText' | 'NotificationTodo' | 'NotificationUser', ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type IUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IUser'] = ResolversParentTypes['IUser']> = {
  __resolveType: TypeResolveFn<'ActiveUser' | 'InvitedUser', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  is_contact?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reviews?: Resolver<ResolversTypes['UserReviewsConnection'], ParentType, ContextType, RequireFields<IUserReviewsArgs, 'first'>>;
};

export type ImageAreaResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageArea'] = ResolversParentTypes['ImageArea']> = {
  x?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteActResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteActResult'] = ResolversParentTypes['InviteActResult']> = {
  invited_user?: Resolver<ResolversTypes['InvitedUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteRequestResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteRequestResult'] = ResolversParentTypes['InviteRequestResult']> = {
  existing_user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitedUser'] = ResolversParentTypes['InvitedUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  is_contact?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reviews?: Resolver<ResolversTypes['UserReviewsConnection'], ParentType, ContextType, RequireFields<InvitedUserReviewsArgs, 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Issue'] = ResolversParentTypes['Issue']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  executor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['LexoRank'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IssueConnection'] = ResolversParentTypes['IssueConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['IssueEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IssueEdge'] = ResolversParentTypes['IssueEdge']> = {
  node?: Resolver<ResolversTypes['Issue'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueSearchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IssueSearchConnection'] = ResolversParentTypes['IssueSearchConnection']> = {
  edges?: Resolver<Array<ResolversTypes['IssueSearchEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueSearchEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IssueSearchEdge'] = ResolversParentTypes['IssueSearchEdge']> = {
  node?: Resolver<ResolversTypes['Issue'], ParentType, ContextType>;
  by_file?: Resolver<ResolversTypes['MessageFile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface LexoRankScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LexoRank'], any> {
  name: 'LexoRank';
}

export type LinkInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkInfo'] = ResolversParentTypes['LinkInfo']> = {
  message?: Resolver<Maybe<ResolversTypes['IMessage']>, ParentType, ContextType>;
  error?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lang?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publisher?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkInfoConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkInfoConnection'] = ResolversParentTypes['LinkInfoConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['LinkInfoEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkInfoEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkInfoEdge'] = ResolversParentTypes['LinkInfoEdge']> = {
  node?: Resolver<ResolversTypes['LinkInfo'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LongIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LongInt'], any> {
  name: 'LongInt';
}

export type MakeOtpResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MakeOTPResult'] = ResolversParentTypes['MakeOTPResult']> = {
  nextBackoffTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  oneTimeLogin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MakePosibleContactsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MakePosibleContactsConnection'] = ResolversParentTypes['MakePosibleContactsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MakePosibleContactsEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MakePosibleContactsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MakePosibleContactsEdge'] = ResolversParentTypes['MakePosibleContactsEdge']> = {
  raw_phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  internationalized_phone?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  is_contact?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeanGradesDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeanGradesDetail'] = ResolversParentTypes['MeanGradesDetail']> = {
  quality?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  communication?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageFile'] = ResolversParentTypes['MessageFile']> = {
  message?: Resolver<ResolversTypes['FileMessage'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FileType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content_length?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  content_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  file_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageFileConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageFileConnection'] = ResolversParentTypes['MessageFileConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['MessageFileEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageFileEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageFileEdge'] = ResolversParentTypes['MessageFileEdge']> = {
  node?: Resolver<ResolversTypes['MessageFile'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  setToken?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSetTokenArgs, 'token'>>;
  refreshToken?: Resolver<ResolversTypes['AuthToken'], ParentType, ContextType>;
  otpToToken?: Resolver<ResolversTypes['OTPToTokenResult'], ParentType, ContextType, RequireFields<MutationOtpToTokenArgs, 'login' | 'password'>>;
  makeOTP?: Resolver<ResolversTypes['MakeOTPResult'], ParentType, ContextType, RequireFields<MutationMakeOtpArgs, 'phone'>>;
  requestPhoneUpdate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType, RequireFields<MutationRequestPhoneUpdateArgs, 'phone'>>;
  verifyPhone?: Resolver<ResolversTypes['PhoneNumber'], ParentType, ContextType, RequireFields<MutationVerifyPhoneArgs, 'code'>>;
  setVoucher?: Resolver<ResolversTypes['RegistrationStep'], ParentType, ContextType, RequireFields<MutationSetVoucherArgs, 'voucher'>>;
  newPrivateChat?: Resolver<ResolversTypes['PrivateChat'], ParentType, ContextType, RequireFields<MutationNewPrivateChatArgs, 'input' | 'user_id'>>;
  newChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationNewChatArgs, 'input' | 'user_ids'>>;
  updateChat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType, RequireFields<MutationUpdateChatArgs, 'id' | 'input'>>;
  deleteChat?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteChatArgs, 'id'>>;
  changeChatCreator?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationChangeChatCreatorArgs, 'chat_id' | 'user_id'>>;
  moveBookmark?: Resolver<ResolversTypes['CheckStatus'], ParentType, ContextType, RequireFields<MutationMoveBookmarkArgs, 'bookmark' | 'chat_id'>>;
  closeChat?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationCloseChatArgs, 'chat_id'>>;
  resumeChat?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationResumeChatArgs, 'chat_id'>>;
  leaveFromChat?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationLeaveFromChatArgs, 'chat_id'>>;
  returnToChat?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationReturnToChatArgs, 'chat_id'>>;
  addUserToChat?: Resolver<ResolversTypes['ChatMember'], ParentType, ContextType, RequireFields<MutationAddUserToChatArgs, 'chat_id' | 'user_id'>>;
  removeUserFromChat?: Resolver<ResolversTypes['ChatMember'], ParentType, ContextType, RequireFields<MutationRemoveUserFromChatArgs, 'chat_id' | 'user_id'>>;
  setDraft?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationSetDraftArgs, 'chat_id' | 'draft'>>;
  presignChatImage?: Resolver<ResolversTypes['PresignedRequest'], ParentType, ContextType, RequireFields<MutationPresignChatImageArgs, 'input'>>;
  presignUserImage?: Resolver<ResolversTypes['PresignedRequest'], ParentType, ContextType, RequireFields<MutationPresignUserImageArgs, 'input'>>;
  presignMessageFile?: Resolver<ResolversTypes['PresignedRequest'], ParentType, ContextType, RequireFields<MutationPresignMessageFileArgs, 'input'>>;
  deleteFile?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteFileArgs, 'id'>>;
  newGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationNewGroupArgs, 'input'>>;
  updateGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationUpdateGroupArgs, 'id' | 'input'>>;
  deleteGroup?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteGroupArgs, 'id'>>;
  hideDefaultGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  updateIssue?: Resolver<ResolversTypes['Issue'], ParentType, ContextType, RequireFields<MutationUpdateIssueArgs, 'id' | 'input'>>;
  newMessages?: Resolver<Array<ResolversTypes['IMessage']>, ParentType, ContextType, RequireFields<MutationNewMessagesArgs, 'chat_id' | 'input'>>;
  newMessages2?: Resolver<ResolversTypes['IChatMessageConnection'], ParentType, ContextType, RequireFields<MutationNewMessages2Args, 'chat_id' | 'input'>>;
  forwardMessages?: Resolver<ResolversTypes['ChatForwardMessageConnection'], ParentType, ContextType, RequireFields<MutationForwardMessagesArgs, 'message_ids' | 'to_chat_ids'>>;
  updateRegularMessage?: Resolver<ResolversTypes['RegularMessage'], ParentType, ContextType, RequireFields<MutationUpdateRegularMessageArgs, 'input' | 'message_id'>>;
  deleteMessages?: Resolver<Array<Maybe<ResolversTypes['ID']>>, ParentType, ContextType, RequireFields<MutationDeleteMessagesArgs, 'chat_id' | 'message_ids'>>;
  setMessageFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSetMessageFavoriteArgs, 'favorite' | 'message_id'>>;
  setLocale?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationSetLocaleArgs, 'locale'>>;
  typing?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationTypingArgs, 'chat_id'>>;
  setClientStatus?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationSetClientStatusArgs, 'online'>>;
  setUserSettings?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationSetUserSettingsArgs, 'data'>>;
  newTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationNewTagArgs, 'input'>>;
  updateTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'id' | 'input'>>;
  deleteTag?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteTagArgs, 'id'>>;
  setIssueTags?: Resolver<ResolversTypes['Issue'], ParentType, ContextType, RequireFields<MutationSetIssueTagsArgs, 'issue_id' | 'tag_ids'>>;
  newTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationNewTodoArgs, 'input'>>;
  deleteTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationDeleteTodoArgs, 'id'>>;
  updateTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, 'id' | 'input'>>;
  updateMe?: Resolver<ResolversTypes['ActiveUser'], ParentType, ContextType, RequireFields<MutationUpdateMeArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['ActiveUser'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  makePosibleContacts?: Resolver<ResolversTypes['MakePosibleContactsConnection'], ParentType, ContextType, RequireFields<MutationMakePosibleContactsArgs, 'phones'>>;
  addPushToken?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddPushTokenArgs, 'token'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  newReminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType, RequireFields<MutationNewReminderArgs, 'input'>>;
  updateReminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType, RequireFields<MutationUpdateReminderArgs, 'id' | 'input'>>;
  checkReminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType, RequireFields<MutationCheckReminderArgs, 'id'>>;
  deleteReminders?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteRemindersArgs, 'ids'>>;
  addUserToReminder?: Resolver<ResolversTypes['ReminderMember'], ParentType, ContextType, RequireFields<MutationAddUserToReminderArgs, 'reminder_id' | 'user_id'>>;
  removeUserFromReminder?: Resolver<ResolversTypes['RemoveUserFromReminderResult'], ParentType, ContextType, RequireFields<MutationRemoveUserFromReminderArgs, 'reminder_id' | 'user_id'>>;
  removeSelfFromReminders?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationRemoveSelfFromRemindersArgs, 'reminder_ids'>>;
  addContact?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddContactArgs, 'user_id'>>;
  removeContact?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationRemoveContactArgs, 'user_id'>>;
  createReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'user_id' | 'input'>>;
  updateReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'id' | 'input'>>;
  deleteReview?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  inviteRequest?: Resolver<ResolversTypes['InviteRequestResult'], ParentType, ContextType, RequireFields<MutationInviteRequestArgs, 'phone'>>;
  inviteAct?: Resolver<ResolversTypes['InviteActResult'], ParentType, ContextType, RequireFields<MutationInviteActArgs, 'phone'>>;
  inviteRetry?: Resolver<ResolversTypes['Void'], ParentType, ContextType, RequireFields<MutationInviteRetryArgs, 'user_id'>>;
};

export type MyUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['MyUser'] = ResolversParentTypes['MyUser']> = {
  __resolveType: TypeResolveFn<'ActiveUser' | 'RegisteringUser', ParentType, ContextType>;
};

export type NotificationDslResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationDSL'] = ResolversParentTypes['NotificationDSL']> = {
  __resolveType: TypeResolveFn<'NotificationText' | 'NotificationUser' | 'NotificationTodo', ParentType, ContextType>;
};

export type NotificationMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationMessage'] = ResolversParentTypes['NotificationMessage']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  is_favorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_my?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['RegisteredUser'], ParentType, ContextType>;
  viewed_by?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['NotificationDSL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationTextResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationText'] = ResolversParentTypes['NotificationText']> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationTodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationTodo'] = ResolversParentTypes['NotificationTodo']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationUser'] = ResolversParentTypes['NotificationUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface NullScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Null'], any> {
  name: 'Null';
}

export type OtpToTokenResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OTPToTokenResult'] = ResolversParentTypes['OTPToTokenResult']> = {
  me?: Resolver<ResolversTypes['MyUser'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['AuthToken'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnlineChangeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OnlineChangeResult'] = ResolversParentTypes['OnlineChangeResult']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_seen?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  online?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextPageStartCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prevPageEndCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export type PresignedFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['PresignedField'] = ResolversParentTypes['PresignedField']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PresignedRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['PresignedRequest'] = ResolversParentTypes['PresignedRequest']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['PresignedField']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrivateChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrivateChat'] = ResolversParentTypes['PrivateChat']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  check_status?: Resolver<ResolversTypes['CheckStatus'], ParentType, ContextType>;
  draft?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  attached_files?: Resolver<ResolversTypes['AttachedFileConnection'], ParentType, ContextType, RequireFields<PrivateChatAttached_FilesArgs, never>>;
  favorite_messages?: Resolver<ResolversTypes['ChatFavoriteMessagesConnection'], ParentType, ContextType, RequireFields<PrivateChatFavorite_MessagesArgs, never>>;
  files?: Resolver<ResolversTypes['MessageFileConnection'], ParentType, ContextType, RequireFields<PrivateChatFilesArgs, never>>;
  links?: Resolver<ResolversTypes['LinkInfoConnection'], ParentType, ContextType, RequireFields<PrivateChatLinksArgs, never>>;
  messages?: Resolver<ResolversTypes['IChatMessageConnection'], ParentType, ContextType, RequireFields<PrivateChatMessagesArgs, never>>;
  todos?: Resolver<ResolversTypes['TodoConnection'], ParentType, ContextType, RequireFields<PrivateChatTodosArgs, never>>;
  users?: Resolver<ResolversTypes['IChatUserConnection'], ParentType, ContextType, RequireFields<PrivateChatUsersArgs, never>>;
  another_user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  hidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['LexoRank']>, ParentType, ContextType>;
  notification?: Resolver<ResolversTypes['ChatNotificationState'], ParentType, ContextType>;
  notification_disabled_till?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  withToken?: Resolver<ResolversTypes['Query'], ParentType, ContextType, RequireFields<QueryWithTokenArgs, 'token'>>;
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType, RequireFields<QueryChatArgs, 'id'>>;
  chats?: Resolver<ResolversTypes['IChatConnection'], ParentType, ContextType, RequireFields<QueryChatsArgs, never>>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<QueryGroupArgs, 'id'>>;
  groups?: Resolver<ResolversTypes['GroupConnection'], ParentType, ContextType>;
  issues?: Resolver<ResolversTypes['IssueConnection'], ParentType, ContextType, RequireFields<QueryIssuesArgs, never>>;
  issue?: Resolver<ResolversTypes['Issue'], ParentType, ContextType, RequireFields<QueryIssueArgs, 'id'>>;
  searchIssue?: Resolver<ResolversTypes['IssueSearchConnection'], ParentType, ContextType, RequireFields<QuerySearchIssueArgs, 'q'>>;
  message?: Resolver<ResolversTypes['IMessage'], ParentType, ContextType, RequireFields<QueryMessageArgs, 'id'>>;
  searchMessages?: Resolver<ResolversTypes['SearchMessagesConnection'], ParentType, ContextType, RequireFields<QuerySearchMessagesArgs, 'first' | 'query'>>;
  favoriteMessages?: Resolver<ResolversTypes['IMessageConnection'], ParentType, ContextType, RequireFields<QueryFavoriteMessagesArgs, never>>;
  settings?: Resolver<ResolversTypes['Settings'], ParentType, ContextType>;
  timesync?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userSettings?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<QueryTagArgs, 'id'>>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  search?: Resolver<Array<ResolversTypes['ActiveUser']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'q'>>;
  me?: Resolver<ResolversTypes['MyUser'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  user_by_phone?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUser_By_PhoneArgs, 'phone'>>;
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType, RequireFields<QueryReminderArgs, 'id'>>;
  reminders?: Resolver<ResolversTypes['ReminderConnection'], ParentType, ContextType, RequireFields<QueryRemindersArgs, never>>;
  contactUsers?: Resolver<ResolversTypes['ContactUsersConnection'], ParentType, ContextType, RequireFields<QueryContactUsersArgs, never>>;
  users?: Resolver<ResolversTypes['RootUserConnection'], ParentType, ContextType>;
  usersWithReview?: Resolver<ResolversTypes['UsersWithReviewConnection'], ParentType, ContextType, RequireFields<QueryUsersWithReviewArgs, 'first'>>;
  review?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>;
};

export type QuotedMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuotedMessage'] = ResolversParentTypes['QuotedMessage']> = {
  __resolveType: TypeResolveFn<'FileMessage' | 'RegularMessage' | 'ForwardMessage' | 'DeletedMessage', ParentType, ContextType>;
};

export type RegisteredUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisteredUser'] = ResolversParentTypes['RegisteredUser']> = {
  __resolveType: TypeResolveFn<'ActiveUser', ParentType, ContextType>;
};

export type RegisteringUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisteringUser'] = ResolversParentTypes['RegisteringUser']> = {
  phone?: Resolver<ResolversTypes['PhoneNumber'], ParentType, ContextType>;
  registration_step?: Resolver<ResolversTypes['RegistrationStep'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['UserImage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteringUserImageUploadedResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisteringUserImageUploadedResult'] = ResolversParentTypes['RegisteringUserImageUploadedResult']> = {
  image?: Resolver<ResolversTypes['UserImage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegularMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegularMessage'] = ResolversParentTypes['RegularMessage']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  is_favorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_my?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['RegisteredUser'], ParentType, ContextType>;
  viewed_by?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['LinkInfo']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quoted_message?: Resolver<Maybe<ResolversTypes['QuotedMessage']>, ParentType, ContextType>;
  mentioned_users?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reminder'] = ResolversParentTypes['Reminder']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  checked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  is_my?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['RegisteredUser'], ParentType, ContextType>;
  users?: Resolver<ResolversTypes['ReminderUserConnection'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReminderConnection'] = ResolversParentTypes['ReminderConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['ReminderEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReminderEdge'] = ResolversParentTypes['ReminderEdge']> = {
  node?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReminderMember'] = ResolversParentTypes['ReminderMember']> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderUserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReminderUserConnection'] = ResolversParentTypes['ReminderUserConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['ReminderUserEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderUserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReminderUserEdge'] = ResolversParentTypes['ReminderUserEdge']> = {
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveUserFromReminderResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveUserFromReminderResult'] = ResolversParentTypes['RemoveUserFromReminderResult']> = {
  reminder_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  mean_grade?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  grades?: Resolver<ResolversTypes['Grades'], ParentType, ContextType>;
  reviewer?: Resolver<ResolversTypes['ActiveUser'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['IUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RootUserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootUserConnection'] = ResolversParentTypes['RootUserConnection']> = {
  edges?: Resolver<Array<ResolversTypes['RootUserEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RootUserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootUserEdge'] = ResolversParentTypes['RootUserEdge']> = {
  is_contact?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchMessagesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchMessagesConnection'] = ResolversParentTypes['SearchMessagesConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['SearchMessagesEdge']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchMessagesEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchMessagesEdge'] = ResolversParentTypes['SearchMessagesEdge']> = {
  node?: Resolver<ResolversTypes['RegularMessage'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Settings'] = ResolversParentTypes['Settings']> = {
  maxUserTags?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxIssueTags?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxChatMembersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxReminderMembersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxForwardMessages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxForwardChats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxDeleteMessagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxFieldLength?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxMessageLength?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxDraftLength?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxMessageFileLength?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  maxMessageImageLength?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  maxChatImageLength?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  maxUserImageLength?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  maxMessagesPerSecond?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  backendBaseUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  frontendBaseUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resizeBaseUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scrapperBaseUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipperBaseUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typingTimeout?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  messageUpdateInterval?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  messageDeleteInterval?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chatDeleteInterval?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxReviewDescriptionLength?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  fChatCreated?: SubscriptionResolver<ResolversTypes['CreateChatResult'], "fChatCreated", ParentType, ContextType>;
  fUserAddedToChat?: SubscriptionResolver<ResolversTypes['AddUserToChatResult'], "fUserAddedToChat", ParentType, ContextType, RequireFields<SubscriptionFUserAddedToChatArgs, never>>;
  chatCreated?: SubscriptionResolver<ResolversTypes['IChat'], "chatCreated", ParentType, ContextType>;
  privateChatActivated?: SubscriptionResolver<ResolversTypes['PrivateChat'], "privateChatActivated", ParentType, ContextType>;
  groupChatCreated?: SubscriptionResolver<ResolversTypes['Chat'], "groupChatCreated", ParentType, ContextType>;
  chatUpdated?: SubscriptionResolver<ResolversTypes['IChat'], "chatUpdated", ParentType, ContextType>;
  chatDeleted?: SubscriptionResolver<ResolversTypes['ID'], "chatDeleted", ParentType, ContextType>;
  checkStatusUpdated?: SubscriptionResolver<ResolversTypes['CheckStatus'], "checkStatusUpdated", ParentType, ContextType>;
  userRemovedFromChat?: SubscriptionResolver<ResolversTypes['ChatMember'], "userRemovedFromChat", ParentType, ContextType>;
  draftSet?: SubscriptionResolver<Maybe<ResolversTypes['DraftSetResult']>, "draftSet", ParentType, ContextType>;
  fileDeleted?: SubscriptionResolver<ResolversTypes['ID'], "fileDeleted", ParentType, ContextType>;
  chatImageUploaded?: SubscriptionResolver<ResolversTypes['ChatImageUploadedResult'], "chatImageUploaded", ParentType, ContextType>;
  fileAttached?: SubscriptionResolver<ResolversTypes['AttachedFile'], "fileAttached", ParentType, ContextType>;
  userImageUploaded?: SubscriptionResolver<ResolversTypes['UserImageUploadedResult'], "userImageUploaded", ParentType, ContextType>;
  registeringUserImageUploaded?: SubscriptionResolver<ResolversTypes['RegisteringUserImageUploadedResult'], "registeringUserImageUploaded", ParentType, ContextType>;
  groupCreated?: SubscriptionResolver<ResolversTypes['Group'], "groupCreated", ParentType, ContextType>;
  groupUpdated?: SubscriptionResolver<ResolversTypes['Group'], "groupUpdated", ParentType, ContextType>;
  groupDeleted?: SubscriptionResolver<ResolversTypes['ID'], "groupDeleted", ParentType, ContextType>;
  issueUpdated?: SubscriptionResolver<ResolversTypes['Issue'], "issueUpdated", ParentType, ContextType>;
  urlScraped?: SubscriptionResolver<ResolversTypes['LinkInfo'], "urlScraped", ParentType, ContextType>;
  messagesCreated?: SubscriptionResolver<ResolversTypes['IChatMessageConnection'], "messagesCreated", ParentType, ContextType>;
  messageCreated?: SubscriptionResolver<ResolversTypes['IChatMessageEdge'], "messageCreated", ParentType, ContextType>;
  messageUpdated?: SubscriptionResolver<ResolversTypes['IMessage'], "messageUpdated", ParentType, ContextType>;
  messagesDeleted?: SubscriptionResolver<Array<ResolversTypes['ID']>, "messagesDeleted", ParentType, ContextType>;
  userOnline?: SubscriptionResolver<ResolversTypes['OnlineChangeResult'], "userOnline", ParentType, ContextType>;
  userOffline?: SubscriptionResolver<ResolversTypes['OnlineChangeResult'], "userOffline", ParentType, ContextType>;
  typing?: SubscriptionResolver<ResolversTypes['ActiveChatMember'], "typing", ParentType, ContextType, RequireFields<SubscriptionTypingArgs, never>>;
  tagCreated?: SubscriptionResolver<ResolversTypes['Tag'], "tagCreated", ParentType, ContextType>;
  tagUpdated?: SubscriptionResolver<ResolversTypes['Tag'], "tagUpdated", ParentType, ContextType>;
  tagDeleted?: SubscriptionResolver<ResolversTypes['ID'], "tagDeleted", ParentType, ContextType>;
  issueTagsSetted?: SubscriptionResolver<ResolversTypes['Issue'], "issueTagsSetted", ParentType, ContextType>;
  todoCreated?: SubscriptionResolver<ResolversTypes['Todo'], "todoCreated", ParentType, ContextType>;
  todoDeleted?: SubscriptionResolver<ResolversTypes['Todo'], "todoDeleted", ParentType, ContextType>;
  todoUpdated?: SubscriptionResolver<ResolversTypes['Todo'], "todoUpdated", ParentType, ContextType>;
  userUpdated?: SubscriptionResolver<ResolversTypes['ActiveUser'], "userUpdated", ParentType, ContextType>;
  reminderCreated?: SubscriptionResolver<ResolversTypes['Reminder'], "reminderCreated", ParentType, ContextType>;
  reminderUpdated?: SubscriptionResolver<ResolversTypes['Reminder'], "reminderUpdated", ParentType, ContextType>;
  reminderActivated?: SubscriptionResolver<ResolversTypes['Reminder'], "reminderActivated", ParentType, ContextType>;
  remindersDeleted?: SubscriptionResolver<Array<ResolversTypes['ID']>, "remindersDeleted", ParentType, ContextType>;
  userAddedToReminder?: SubscriptionResolver<ResolversTypes['ReminderMember'], "userAddedToReminder", ParentType, ContextType>;
  userRemovedFromReminder?: SubscriptionResolver<ResolversTypes['RemoveUserFromReminderResult'], "userRemovedFromReminder", ParentType, ContextType>;
  contactsAdded?: SubscriptionResolver<Array<ResolversTypes['User']>, "contactsAdded", ParentType, ContextType>;
  contactRemoved?: SubscriptionResolver<ResolversTypes['ID'], "contactRemoved", ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  issues?: Resolver<ResolversTypes['IssueConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagConnection'] = ResolversParentTypes['TagConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['TagEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagEdge'] = ResolversParentTypes['TagEdge']> = {
  node?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  caption?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['LexoRank'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['TodoState'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['IChat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoConnection'] = ResolversParentTypes['TodoConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['TodoEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoEdge'] = ResolversParentTypes['TodoEdge']> = {
  node?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  __resolveType: TypeResolveFn<'ActiveUser' | 'InvitedUser', ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserImage'] = ResolversParentTypes['UserImage']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['ImageArea']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content_length?: Resolver<ResolversTypes['LongInt'], ParentType, ContextType>;
  content_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserImageUploadedResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserImageUploadedResult'] = ResolversParentTypes['UserImageUploadedResult']> = {
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['UserImage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  email?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  job_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  declension?: Resolver<Maybe<ResolversTypes['UserProfileDeclension']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileCityDeclensionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfileCityDeclension'] = ResolversParentTypes['UserProfileCityDeclension']> = {
  in?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileDeclensionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfileDeclension'] = ResolversParentTypes['UserProfileDeclension']> = {
  city?: Resolver<Maybe<ResolversTypes['UserProfileCityDeclension']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['Declention']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['Declention']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserReviewsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserReviewsConnection'] = ResolversParentTypes['UserReviewsConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['UserReviewsEdge']>, ParentType, ContextType>;
  mean_grade?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  mean_grades_detail?: Resolver<Maybe<ResolversTypes['MeanGradesDetail']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  my_review?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserReviewsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserReviewsEdge'] = ResolversParentTypes['UserReviewsEdge']> = {
  node?: Resolver<ResolversTypes['Review'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersWithReviewConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersWithReviewConnection'] = ResolversParentTypes['UsersWithReviewConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['UsersWithReviewEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersWithReviewEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersWithReviewEdge'] = ResolversParentTypes['UsersWithReviewEdge']> = {
  node?: Resolver<ResolversTypes['IUser'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoidResolvers<ContextType = any, ParentType extends ResolversParentTypes['Void'] = ResolversParentTypes['Void']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ActiveChatMember?: ActiveChatMemberResolvers<ContextType>;
  ActiveUser?: ActiveUserResolvers<ContextType>;
  AddUserToChatResult?: AddUserToChatResultResolvers<ContextType>;
  AttachedFile?: AttachedFileResolvers<ContextType>;
  AttachedFileConnection?: AttachedFileConnectionResolvers<ContextType>;
  AttachedFileEdge?: AttachedFileEdgeResolvers<ContextType>;
  AuthToken?: AuthTokenResolvers<ContextType>;
  Bookmark?: GraphQLScalarType;
  Chat?: ChatResolvers<ContextType>;
  ChatFavoriteMessagesConnection?: ChatFavoriteMessagesConnectionResolvers<ContextType>;
  ChatForwardMessageConnection?: ChatForwardMessageConnectionResolvers<ContextType>;
  ChatFrowardMessageEdge?: ChatFrowardMessageEdgeResolvers<ContextType>;
  ChatImage?: ChatImageResolvers<ContextType>;
  ChatImageUploadedResult?: ChatImageUploadedResultResolvers<ContextType>;
  ChatMember?: ChatMemberResolvers<ContextType>;
  CheckStatus?: CheckStatusResolvers<ContextType>;
  ContactUsersConnection?: ContactUsersConnectionResolvers<ContextType>;
  ContactUsersEdge?: ContactUsersEdgeResolvers<ContextType>;
  CreateChatResult?: CreateChatResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Declention?: DeclentionResolvers<ContextType>;
  DeletedMessage?: DeletedMessageResolvers<ContextType>;
  DraftSetResult?: DraftSetResultResolvers<ContextType>;
  Email?: GraphQLScalarType;
  FileMessage?: FileMessageResolvers<ContextType>;
  ForwardMessage?: ForwardMessageResolvers<ContextType>;
  ForwardedMessage?: ForwardedMessageResolvers<ContextType>;
  Grade?: GraphQLScalarType;
  Grades?: GradesResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  GroupConnection?: GroupConnectionResolvers<ContextType>;
  GroupEdge?: GroupEdgeResolvers<ContextType>;
  IChat?: IChatResolvers<ContextType>;
  IChatConnection?: IChatConnectionResolvers<ContextType>;
  IChatEdge?: IChatEdgeResolvers<ContextType>;
  IChatMessageConnection?: IChatMessageConnectionResolvers<ContextType>;
  IChatMessageEdge?: IChatMessageEdgeResolvers<ContextType>;
  IChatNootificationMessageEdge?: IChatNootificationMessageEdgeResolvers<ContextType>;
  IChatUserConnection?: IChatUserConnectionResolvers<ContextType>;
  IChatUserEdge?: IChatUserEdgeResolvers<ContextType>;
  IFile?: IFileResolvers<ContextType>;
  IMessage?: IMessageResolvers<ContextType>;
  IMessageConnection?: IMessageConnectionResolvers<ContextType>;
  IMessageEdge?: IMessageEdgeResolvers<ContextType>;
  INotificationText?: INotificationTextResolvers<ContextType>;
  IUser?: IUserResolvers<ContextType>;
  ImageArea?: ImageAreaResolvers<ContextType>;
  InviteActResult?: InviteActResultResolvers<ContextType>;
  InviteRequestResult?: InviteRequestResultResolvers<ContextType>;
  InvitedUser?: InvitedUserResolvers<ContextType>;
  Issue?: IssueResolvers<ContextType>;
  IssueConnection?: IssueConnectionResolvers<ContextType>;
  IssueEdge?: IssueEdgeResolvers<ContextType>;
  IssueSearchConnection?: IssueSearchConnectionResolvers<ContextType>;
  IssueSearchEdge?: IssueSearchEdgeResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LexoRank?: GraphQLScalarType;
  LinkInfo?: LinkInfoResolvers<ContextType>;
  LinkInfoConnection?: LinkInfoConnectionResolvers<ContextType>;
  LinkInfoEdge?: LinkInfoEdgeResolvers<ContextType>;
  LongInt?: GraphQLScalarType;
  MakeOTPResult?: MakeOtpResultResolvers<ContextType>;
  MakePosibleContactsConnection?: MakePosibleContactsConnectionResolvers<ContextType>;
  MakePosibleContactsEdge?: MakePosibleContactsEdgeResolvers<ContextType>;
  MeanGradesDetail?: MeanGradesDetailResolvers<ContextType>;
  MessageFile?: MessageFileResolvers<ContextType>;
  MessageFileConnection?: MessageFileConnectionResolvers<ContextType>;
  MessageFileEdge?: MessageFileEdgeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MyUser?: MyUserResolvers<ContextType>;
  NotificationDSL?: NotificationDslResolvers<ContextType>;
  NotificationMessage?: NotificationMessageResolvers<ContextType>;
  NotificationText?: NotificationTextResolvers<ContextType>;
  NotificationTodo?: NotificationTodoResolvers<ContextType>;
  NotificationUser?: NotificationUserResolvers<ContextType>;
  Null?: GraphQLScalarType;
  OTPToTokenResult?: OtpToTokenResultResolvers<ContextType>;
  OnlineChangeResult?: OnlineChangeResultResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  PresignedField?: PresignedFieldResolvers<ContextType>;
  PresignedRequest?: PresignedRequestResolvers<ContextType>;
  PrivateChat?: PrivateChatResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuotedMessage?: QuotedMessageResolvers<ContextType>;
  RegisteredUser?: RegisteredUserResolvers<ContextType>;
  RegisteringUser?: RegisteringUserResolvers<ContextType>;
  RegisteringUserImageUploadedResult?: RegisteringUserImageUploadedResultResolvers<ContextType>;
  RegularMessage?: RegularMessageResolvers<ContextType>;
  Reminder?: ReminderResolvers<ContextType>;
  ReminderConnection?: ReminderConnectionResolvers<ContextType>;
  ReminderEdge?: ReminderEdgeResolvers<ContextType>;
  ReminderMember?: ReminderMemberResolvers<ContextType>;
  ReminderUserConnection?: ReminderUserConnectionResolvers<ContextType>;
  ReminderUserEdge?: ReminderUserEdgeResolvers<ContextType>;
  RemoveUserFromReminderResult?: RemoveUserFromReminderResultResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  RootUserConnection?: RootUserConnectionResolvers<ContextType>;
  RootUserEdge?: RootUserEdgeResolvers<ContextType>;
  SearchMessagesConnection?: SearchMessagesConnectionResolvers<ContextType>;
  SearchMessagesEdge?: SearchMessagesEdgeResolvers<ContextType>;
  Settings?: SettingsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagConnection?: TagConnectionResolvers<ContextType>;
  TagEdge?: TagEdgeResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  TodoConnection?: TodoConnectionResolvers<ContextType>;
  TodoEdge?: TodoEdgeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserImage?: UserImageResolvers<ContextType>;
  UserImageUploadedResult?: UserImageUploadedResultResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
  UserProfileCityDeclension?: UserProfileCityDeclensionResolvers<ContextType>;
  UserProfileDeclension?: UserProfileDeclensionResolvers<ContextType>;
  UserReviewsConnection?: UserReviewsConnectionResolvers<ContextType>;
  UserReviewsEdge?: UserReviewsEdgeResolvers<ContextType>;
  UsersWithReviewConnection?: UsersWithReviewConnectionResolvers<ContextType>;
  UsersWithReviewEdge?: UsersWithReviewEdgeResolvers<ContextType>;
  Void?: VoidResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
