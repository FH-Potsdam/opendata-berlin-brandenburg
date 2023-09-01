---
layout: admin
title: New Video
---
<table cellpadding="0" cellspacing="0">
<tr>
<td colspan="2">
  <label>ID</label>
  <input tabindex="1" type="text" id="f-id" name="f-id" value="" />
</td>
</tr>
<tr>
  <td>
  <label>Status</label>
  <select id="f-status" name="f-status">
    <option value="missing">missing</option>
    <option value="progress">progress</option>
    <option value="done">done</option>
  </select>
  </td>
  <td>
  <label>Category</label>
  <select id="f-category" name="f-category">
    <option value="theory">theory</option>
    <option value="data">data</option>
    <option value="import">import</option>
    <option value="create">create</option>
    <option value="modify">modify</option>
    <option value="analyse">analyse</option>
    <option value="visualise">visualise</option>
    <option value="export">export</option>
  </select>
  </td>
</tr>
<tr>
  <td>
  <label>Title</label>
  DE:<br /><input type="text" id="f-title_de" name="f-title_de" value="" />
  </td>
  <td>
  EN:<br /><input type="text" id="f-title_en" name="f-title_en" value="" />
  </td>
</tr>
<tr>
  <td>
  <label>File</label>
  DE:<br /><input type="text" id="f-file_de" name="f-file_de" value="" />
  </td>
  <td>
  EN:<br /><input type="text" id="f-file_en" name="f-file_en" value="" />
  </td>
</tr>
<tr>
<td>
  <label>Description</label>
  DE:<br /><textarea type="text" id="f-description_de" name="f_description_de"></textarea>
</td>
<td>
  EN:<br /><textarea type="text" id="f-description_en" name="f_description_en"></textarea>
  </td>
</tr>
<tr>
  <td colspan="2">
  <label>Links</label><br />
  <select id="f-links" name="f-links" multiple>
    <option value="">---</option>
{% for v in videos %}
    <option value="{{v.id}}">{{v.title.de}}</option>
{% endfor %}
  </select>
  </td>
</tr>
<tr>
  <td colspan="2">
  <div id="overlays"></div>
  <button id="overlay-btn">Add Overlay</button>
  </td>
</tr>
</table>
<button onclick="create()">Create</button>
<script>
const params = [
  'id',
  'file_de', 'file_en',
  'status',
  'title_de', 'title_en',
  'description_de', 'description_en',
  'category',
  'status',
  'links'
];
let overlayCount = 0;
const create = () => {
  const paramDict = {overlays:[]};
  params.forEach(p => {
    if (document.querySelector('#f-' + p)) {
      paramDict[p] = document.querySelector('#f-' + p).value;
    }
  });
  let tOverlays = [];
  for (let i = 1; i <= overlayCount; i++){
    if (document.querySelector('#overlays-timestamp-'+i)) {
      tOverlays.push({
          "timestamp": document.querySelector('#overlays-timestamp-'+i).value,
          "text": {
            "de": document.querySelector('#overlays-text-de-'+i).value,
            "en": document.querySelector('#overlays-text-en-'+i).value
          },
          "link": document.querySelector('#overlays-link-'+i).value
      });
    }
  }
  if (tOverlays.length > 0){
    paramDict.overlays = JSON.stringify(tOverlays);
  }
  fetch(
    "http://localhost:3000/videos/insert?" +
    new URLSearchParams(paramDict)
  );
  return null;
};
document.querySelector('#overlay-btn').addEventListener('click', () => {
  overlayCount++;
  const container = document.querySelector('#overlays');
  const div = document.createElement('div');
  div.innerHTML = `<label>Timestamp</label>
  <input type="text" id="overlays-timestamp-${overlayCount}" />
  <label>Text</label>
  DE:<br />
  <input type="text" id="overlays-text-de-${overlayCount}" />
  EN:<br />
  <input type="text" id="overlays-text-en-${overlayCount}" />
  <label>Link</label>
  <input type="text" id="overlays-link-${overlayCount}" />
  <hr />`;
  container.appendChild(div);
});
</script>