import axios from 'axios';

export function getHotWords() {
  const url = '/api/hotword';

  return axios.get(url);
}

export function getSuggestions(q) {
  const url = 'api/suggest';

  const options = {
    func: 'suggest',
    suggest_type: 'accurate',
    sub_type: 'tag',
    main_ver: 'v1',
    bangumi_acc_num: 3,
    special_acc_num: 0,
    upuser_acc_num: 0,
    tag_num: 10,
    term: q,
    highlight: '',
  };
  return axios.get(url, { params: options });
}
