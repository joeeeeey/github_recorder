const Records = require("../models/record");
const moment = require("moment");
const Sequelize = require("sequelize");
const SlackController = require('./slackController')

class RecordsController {
  static async getRecords(filters) {
    const { limit = 10, pageNumber, whereClause } = filters;

    const totalCounts = await Records.count(filters.whereClause);

    const offset = limit * (pageNumber - 1);

    const likeClause = {}

    console.log('whereClause: ', whereClause);
    Object.keys(whereClause).forEach(key => {
      likeClause[key] = { [Sequelize.Op.like]: `%${whereClause[key]}%`}
    });

    const records = await Records.findAll({
      where: likeClause,
      order: [
        ["created_at", "DESC"]
      ],
      limit,
      offset,
    });
    return {
      success: 1,
      totalCounts,
      pageNumber,
      records
    };
  }

  static async addRecord(params) {
    const record = await Records.create(params);
    return record;
  }

  static async handleGithubCallback(data) {
    const { ref, head_commit, repository } = data;

    //  if (ref === 'refs/heads/master') {
    if (!!ref) {
      if (head_commit && repository) {
        const { author, message, id, url } = head_commit;

        const payload = {
          message,
          branch_ref: ref,
          head_commit: id,
          head_commit_url: url,
          author: author.name,
          project_name: repository.name,
          data: JSON.stringify(data),
          created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        }

        try {
          if (ref === 'refs/heads/master'){
            await SlackController.sendMessage(payload)
          }
          
          await this.addRecord(payload);

          return {success: 1};
        } catch (error) {
          return {success: 0, msg: error.toString()};
        }
      } else {
        return { msg: "Missing param" };
      }
    } else {
      return { msg: "Not master barnch" };
    }
  }
}

module.exports = RecordsController;
