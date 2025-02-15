import passport from "passport";
import { type Profile as GitHubProfile } from "passport-github2";

export default class MockGHStrategy extends passport.Strategy {
  _cb: (
    accessToken: string,
    refreshToken: string,
    profile: GitHubProfile,
    done: (a: unknown, user: Express.User | false) => void
  ) => void;
  _user: GitHubProfile;

  constructor(name: string, cb: any) {
    super();

    this.name = name;
    this._cb = cb;
    this._user = githubUser;
  }

  /**
   * Authenticate a request.
   *
   * `this.success(user, info)`, `this.fail(challenge, status)`,
   * `this.redirect(url, status)`, `this.pass()`, or `this.error(err)`.
   * https://github.com/jaredhanson/passport-strategy#augmented-methods.
   *
   * @param {Object} req - Request.
   * @param {Object} options - The options object passed to `passport.authenticate()`.
   * @return {void}
   */
  authenticate(req: any, options: any) {
    this._cb("N/A", "N/A", this._user, (err: any, user: any) => {
      this.success(user);
    });
  }
}

// The reply from github oauth2
const githubUser = {
  id: "19558427",
  nodeId: "11111",
  displayName: "Sai Nimmagadda",
  username: "snimmagadda1",
  profileUrl: "https://github.com/snimmagadda1",
  photos: [
    {
      value: "https://avatars.githubusercontent.com/u/19558427?v=4",
    },
  ],
  provider: "github",
  _json: {
    login: "snimmagadda1",
    id: 19558427,
    node_id: "11111",
    avatar_url: "https://avatars.githubusercontent.com/u/19558427?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/snimmagadda1",
    html_url: "https://github.com/snimmagadda1",
    followers_url: "https://api.github.com/users/snimmagadda1/followers",
    following_url:
      "https://api.github.com/users/snimmagadda1/following{/other_user}",
    gists_url: "https://api.github.com/users/snimmagadda1/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/snimmagadda1/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/snimmagadda1/subscriptions",
    organizations_url: "https://api.github.com/users/snimmagadda1/orgs",
    repos_url: "https://api.github.com/users/snimmagadda1/repos",
    events_url: "https://api.github.com/users/snimmagadda1/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/snimmagadda1/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    name: "Sai Nimmagadda",
    company: "@Optum",
    blog: "https://s11a.com",
    location: "Raleigh, NC",
    email: null,
    hireable: null,
    bio: "Currently Employed: Full Stack @ Optum,\r\n\r\nBSE Electrical and Computer Engineering, Biomedical Engineering\r\nfrom Duke",
    twitter_username: "funsaized",
    notification_email: null,
    public_repos: 58,
    public_gists: 2,
    followers: 19,
    following: 13,
    created_at: "2016-05-24T19:02:08Z",
    updated_at: "2025-01-06T13:45:25Z",
  },
};
