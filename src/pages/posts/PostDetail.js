import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CreateCommentForm from "../comments/CreateCommentForm";
import Post from "./Post";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row>
      <Col lg={9}>
        <Container>
          <p>extra component here. profiles? for mobile/tablets</p>
        </Container>
        <Container>
          <Post {...post.results[0]} postDetail setPosts={setPost} />
        </Container>
        <Container>
          {currentUser ? (
            <CreateCommentForm
              post={id}
              setPost={setPost}
              setComments={setComments}
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
            />
          ) : comments.results.length ? (
            "list comments here"
          ) : null}
        </Container>
      </Col>
      <Col className="d-none d-lg-block" lg={3}>
        <Container>extra component here. profiles? for desktop</Container>
      </Col>
    </Row>
  );
}

export default PostDetail;
