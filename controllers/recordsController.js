const Records = require("../models/record");
const moment = require('moment');

class RecordsController {
  static async getRecords() {
    const records = await Records.findAll();
    return records;
  }

  static async addRecord(params) {
    const record = await Records.create(params);
    return record;
  }

  static async handleGithubCallback(data) {
    const { ref, head_commit, repository } = data;
    console.log('ref: ', ref);
    console.log('head_commit: ', !!head_commit);
    console.log('repository: ', !!repository);

    // const { author } = head_commit;
    // const result = await addRecord(
    //   {
    //     author: author.name,
    //     project_name: repository.name,
    //     data: JSON.stringify(data),
    //     created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    //   }
    // )
    // return result;

     if (ref === 'refs/heads/master') {
       if (head_commit && repository) {
        const { author } = head_commit;
          const result = await this.addRecord(
            {
              author: author.name,
              project_name: repository.name,
              data: JSON.stringify(data),
              created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            }
          )
          return result;
       } else {
         return { msg: 'Missing param' }
       }
     } else {
      return { msg: 'Not master barnch' }
     }
  }
}

module.exports = RecordsController;
