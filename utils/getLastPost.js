import fs from 'fs';

// returns lastPost object

export default function getLastPost() {
  const lastPostString = fs.readFileSync('data/lastPost.json', {
    encoding: 'utf-8',
  });
  return JSON.parse(lastPostString);
}
