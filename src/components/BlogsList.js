import React from 'react';
import Chance from 'chance';

const chance = new Chance();

const BlogList = (props) => {
  const { name, title } = props;
  const blogPosts = Array.from({ length: 5 }, () => ({
    id: chance.guid(),
    title: chance.sentence({ words: 5 }),
    author: chance.name(),
    date: chance.date({ string: true, american: false }),
    avatar: chance.avatar(), // Tạo đường dẫn ảnh giả từ Chance
  }));

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <img src={post.avatar} alt="Avatar" /> {/* Hiển thị ảnh (avatar) */}
            <div>
              <h2>{name}</h2> {/* Hiển thị tiêu đề bài viết */}
              <p>{title}</p> {/* Hiển thị tên tác giả */}
              <p className="date">{post.date}</p> {/* Hiển thị thời gian đăng */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
