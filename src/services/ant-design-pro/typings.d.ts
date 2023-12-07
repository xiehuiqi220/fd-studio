// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type ProjectList = {
    data?: ProjectItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type ShotType = {
    id: string;
    sortNum?: number;
    shotNum?: number;
    picture?: string;
    scenery?: number;
    duration?: number;
    angle?: string;
    lens?: number;
    move?: string;
    voice?: string;
    sbId: string; //分镜基本信息id，分镜下面有镜头，1:n
    content?: string;
    last_modified_at?: number;
    created_at?: number;
  };

  type Storyboard = {
    id: string;
    projectId: string;
    title: string;
    fps: number;
  };

  type ProjectItem = {
    id?: string;
    title?: string;
    createdUserId?: string;
    createdAt?: number;
    updatedAt?: number;
    createdUserName?: string;
    logo?: object[{ url: string }];
    director?: string;
    orgId?: string;
    status?: string;
    description?: string;
    type?: string;
  };

  type Script = {
    id?: string;
    projectId?: string;
    title?: string;
    description?: string;
    createdUserId?: string;
    createdAt?: string;
    updatedAt?: string;
    scriptSections?: [
      object[{
        id?: string;
        scriptId?: string;
        location?: string;
        content?: string;
      }],
    ];
  };

  type ConceptPicture = {
    id?: string;
    title?: string;
    url?: string;
    description?: string;
  };

  type Location = {
    id?: string;
    projectId: string;
    title?: string;
    serialNumber?: string;
    logo?: object[{ url: string }];
    realAddress?: string;
    pictureList?: ConceptPicture[];
    description?: string;
    type?: number;
  };

  type Character = {
    id?: string;
    projectId: string;
    age?: number;
    gender?: string;
    title?: string;
    serialNumber?: string;
    logo?: object[{ url: string }];
    pictureList?: ConceptPicture[];
    description?: string;
    type?: number;
  };

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
