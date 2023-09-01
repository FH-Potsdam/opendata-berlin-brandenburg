---
layout: admin
pagination:
    data: videos
    size: 1
    alias: video
permalink: "admin/videos/edit/{{ video.id }}/"
---
<table cellpadding="0" cellspacing="0">
<tr>
<td colspan="2">
  <label>ID</label>
  <input type="text" id="f-id" name="f-id" value="{{ video.id }}" />
</td>
</tr>
<tr>
  <td>
  <label>Status</label>
  <select id="f-status" name="f-status">
    <option value="missing"{% if video.status == 'missing' %} selected{% endif %}>missing</option>
    <option value="progress"{% if video.status == 'progress' %} selected{% endif %}>progress</option>
    <option value="done"{% if video.status == 'done' %} selected{% endif %}>done</option>
  </select>
</td>
<td>
  <label>Category</label>
  <select id="f-category" name="f-category">
    <option value="theory"{% if video.category == 'theory' %} selected{% endif %}>theory</option>
    <option value="data"{% if video.category == 'data' %} selected{% endif %}>data</option>
    <option value="import"{% if video.category == 'import' %} selected{% endif %}>import</option>
    <option value="create"{% if video.category == 'create' %} selected{% endif %}>create</option>
    <option value="modify"{% if video.category == 'modify' %} selected{% endif %}>modify</option>
    <option value="analyse"{% if video.category == 'analyse' %} selected{% endif %}>analyse</option>
    <option value="visualise"{% if video.category == 'visualise' %} selected{% endif %}>visualise</option>
    <option value="export"{% if video.category == 'export' %} selected{% endif %}>export</option>
  </select>
</td>
</tr>
<tr>
  <td>
  <label>Title</label>
  DE:<br /><input type="text" id="f-title_de" name="f-title_de" value="{{ video.title.de }}" />
</td>
<td>
  EN:<br /><input type="text" id="f-title_en" name="f-title_en" value="{{ video.title.en }}" />
</td>
</tr>
<tr>
  <td>
  <label>File</label>
  DE:<br /><input type="text" id="f-file_de" name="f-file_de" value="{{ video.file.de }}" />
</td>
<td>
  EN:<br /><input type="text" id="f-file_en" name="f-file_en" value="{{ video.file.en }}" />
</td>
</tr>
<tr>
  <td>
  <label>Description</label>
  DE:<br /><textarea type="text" id="f-description_de" name="f_description_de">{{ video.description.de }}</textarea>
</td>
<td>
  EN:<br /><textarea type="text" id="f-description_en" name="f_description_en">{{ video.description.en }}</textarea>
</td>
</tr>
<tr>
  <td colspan="2">
  <label>Links</label>
  <select id="f-links" name="f-links" multiple>
    <option value="">---</option>
{% for v in videos %}
    <option value="{{v.id}}" {% if  v.id in video.links %} selected{% endif %}>{{v.title.de}}</option>
{% endfor %}
  </select>
</td></tr>
<tr>
  <td colspan="2">
  <div id="overlays">
{% set overlayCount = 0 %}
{% for o in video.overlays %}
    <label>Timestamp</label>
    <input type="text" value="{{o.timestamp}}" id="overlays-timestamp-{{loop.index}}" />
    <label>Text</label>
    DE:<br />
    <input type="text" value="{{o.text.de}}" id="overlays-text-de-{{loop.index}}" />
    EN:<br />
    <input type="text" value="{{o.text.en}}" id="overlays-text-en-{{loop.index}}" />
    <label>Link</label>
    <input type="text" value="{{o.link}}" id="overlays-link-{{loop.index}}" />
    <hr />
    {% set overlayCount = loop.index %}
{% endfor %}
  </div>
  <button id="overlay-btn">Add Overlay</button>
  </td>
</tr>
</table>
 <button onclick="update()">Update</button>
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
let overlayCount = {{overlayCount}};
const update = () => {
  const paramDict = {overlays:null};
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
    "http://localhost:3000/videos/update?" +
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