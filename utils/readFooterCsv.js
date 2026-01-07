import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'


const csvPath = path.join(__dirname, '../fixtures/FooterMenu.csv');


export function getFooterData() {
      const records = parse(fs.readFileSync(csvPath), {
            columns: true,
            skip_empty_lines: true,
            trim: true,
      });

      const footerMap = {};
      let currentTopic = '';

      records.forEach(row => {
            if (row.footerTopics) {
                  currentTopic = row.footerTopics;
                  footerMap[currentTopic] = [];
            }

            if (row.FooterElements) {
                  footerMap[currentTopic].push(row.FooterElements.trim());
            }
      })

      return footerMap;

}