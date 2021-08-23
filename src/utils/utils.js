import { filter, forEach, uniq } from 'lodash';

export const variantExtractor = (checklists = [], fieldName) => {
  if (!checklists.length) {
    return [];
  }
  const temp = [];
  forEach(checklists, checklist => temp.push(checklist[fieldName]));
  const result = uniq(temp);

  return filter(result, res => res !== '');
};

export const readFileAsArrayBuffer = file =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsArrayBuffer(file);
  });

export const readFileAsJSON = file =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsText(file);
  });

export function downloadTextFile(text, name) {
  const a = document.createElement('a');
  const type = name.split('.').pop();
  a.href = URL.createObjectURL(new Blob([text], { type: `text/${type === 'txt' ? 'plain' : type}` }));
  a.download = name;
  a.click();
}
