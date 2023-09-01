---
layout: admin
title: Video
---
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
{% for v in videos %}<tr>
      <td>{{ v.id }}</td>
      <td>{{ v.title.de }}</td>
      <td>
        <a href="/admin/videos/edit/{{v.id}}/">Edit</a>&nbsp;|&nbsp;<a onclick="deleteVideo('{{v.id}}')">Delete</a>
      </td>
    </tr>{% endfor %}
  </tbody>
  <tfoot>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Actions</th>
    </tr>
  </tfoot>
</table>
<script>
  const deleteVideo = (id) => {
    fetch("http://localhost:3000/videos/delete?id=" + id);
    return null;
  };
</script>
