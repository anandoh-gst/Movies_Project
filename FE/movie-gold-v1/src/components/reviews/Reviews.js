import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviwsForm from "../reviewsForm/ReviwsForm";

import React from 'react'

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText       = useRef();
    const params        = useParams();
    const movieId       = params.movieId;

    useEffect( () => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) =>{
        
        e.preventDefault();
        
        const rev = revText.current;

        try {


            const response = await api.post("/reviews", {reviewBody: rev.value, imdbId:movieId});
    
            const updatedReviews = [...reviews, { body: rev.value }];

            rev.value = "";
    
            setReviews(updatedReviews);
            
        } 
        catch (error) {
            console.error("Failed to add review: ", error);
        }
    }

  return (
    <div>
        <Container>

            <Row>
                <Col> <h3>Reviews</h3> </Col>
            </Row>

            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviwsForm handleSubmit={addReview} revText={revText} labelText = "What are you thinking about this movie?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                         reviews?.map((r, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Row>
                                        <Col> {r.body} </Col>
                                    </Row>
                                </React.Fragment>
                            )
                        })
                    }
                </Col>
            </Row>

            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>

        </Container>
    </div>
  )
}

export default Reviews;