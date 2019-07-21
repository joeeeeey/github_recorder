const axios = require("axios");
const moment = require("moment");
const config = require("../config/config");

const channalHost = config.slack.appHookHost;

class SlackController {
  static async sendMessage(payload) {
    // {
    //   message,
    //   branch_ref: ref,
    //   head_commit: id,
    //   author: author.name,
    //   project_name: repository.name,
    //   data: JSON.stringify(data),
    //   created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    // }
    const text = `*${
      payload.project_name
    }* *Master* branch is merged by *${payload.author}* At *${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}*!
\`\`\`${payload.message}\`\`\``;
// ${payload.head_commit_url}
// <!here>`;
    const response = await axios.post(channalHost, {
      text,
      as_user: true,
      mrkdwn: true
    });

    return response;
  }
}

module.exports = SlackController;
