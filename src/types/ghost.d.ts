declare module '@tryghost/content-api' {
  interface GhostContentAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  interface BrowseParams {
    limit?: number | string;
    page?: number;
    include?: string;
    filter?: string;
    order?: string;
  }

  interface ReadParams {
    slug: string;
    include?: string;
  }

  interface PostsAPI {
    browse(params?: BrowseParams): Promise<unknown[]>;
    read(params: ReadParams): Promise<unknown>;
  }

  interface TagsAPI {
    browse(params?: BrowseParams): Promise<unknown[]>;
  }

  class GhostContentAPI {
    constructor(options: GhostContentAPIOptions);
    posts: PostsAPI;
    tags: TagsAPI;
  }

  export default GhostContentAPI;
}
