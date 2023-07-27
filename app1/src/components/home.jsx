import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
class Home extends Component {
    state = {}
    
    render() {

        return (
            <>
                
                <img src="https://i.pinimg.com/originals/2e/c5/46/2ec546171974c6a2d1e11e1b11e275ee.gif" width="1540" height="495" alt="Logo" />

                <div className="container-lg" >
                    
                    <div className="container-title container-fluid"> 
                        WELCOME PLANT WEB APP !
                    </div>
                    <p className="lead dummy1 mt-4 ">
                        It uses utility classNamees for typography and spacing to space content out within the larger container.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer id odio sagittis, varius elit in, maximus augue.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Suspendisse interdum sed enim in semper.
                        Vestibulum vel risus quis elit tincidunt accumsan eget nec orci.
                        Quisque sapien turpis, lobortis sit amet pharetra in, fermentum convallis nibh.
                        Aliquam eget interdum quam, malesuada suscipit ligula. Curabitur in sollicitudin sapien.
                        Fusce scelerisque sed ante eu pretium. Integer mauris dolor, fringilla a dictum eu, lacinia et est.
                        Vivamus sollicitudin, diam nec consequat venenatis, lectus metus vehicula velit, at interdum nisi enim sed urna.
                        Quisque quis nisl sed sapien dictum rutrum. Sed iaculis nisi metus, non finibus elit tristique non. 
                        Etiam lacinia porttitor aliquet. Donec molestie vulputate sapien, quis mattis nibh. Praesent at pharetra orci. 
                        Aliquam condimentum nulla eu lorem lobortis, eu elementum odio faucibus. In purus nibh, egestas et lacinia eget, vestibulum sed tellus. Ut dictum nibh felis, nec fringilla lacus ullamcorper maximus. 
                        Vivamus vel viverra ex, id sollicitudin enim. Cras nec tellus dolor.
                        Nulla et ex et ipsum ultricies porta sed sed risus. Mauris tempus lacus non nulla luctus, vulputate condimentum quam consequat.
                    </p>
                    <hr className="my-4  "/>
                    <p className="dummy2">
                        Its a webpage where you can join to a whole new plant community, share your similar interests, and also connect your own plant to this page.
                        Nulla fermentum justo vitae gravida finibus. 
                        Donec hendrerit libero non tristique volutpat.
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Phasellus ullamcorper risus sit amet lectus condimentum hendrerit. 
                        Sed faucibus neque vel sem faucibus, quis faucibus sem feugiat. Praesent maximus dui vitae porta iaculis. Etiam in fringilla sem, id vehicula eros.
                        Nulla sed ultrices tortor.
                        Nunc lectus dolor, pulvinar id hendrerit a, mattis non velit. 
                        Aenean sodales nunc ac lectus luctus, in dictum magna tincidunt.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. 
                        In quis elit lacinia, hendrerit purus vel, scelerisque mi. Vestibulum aliquet sem non tellus auctor volutpat. 
                    
                        <br />
                        <a className="btn btn-outline-danger btn-lg mt-4" href="https://www.polleverywhere.com/" role="button">Learn more</a>

                    </p>
                   
                </div>

                <div className="center container mt-4 mb-4">
                                        
                    <Card>
                            <Card.Body className="contact ">
                                <Card.Title className="display-4 ">CONTACT</Card.Title>
                            <Card.Text>
                                <p className="opacity-1">Any problems any suggestions Drop a message !!</p>
                                    <Row>
                                        <Col>  
                                           <div className="card1">
                                               <i className="fa fa-map-marker" ></i> Budalnilkantha, nepal<br />
                                               <i className="fa fa-phone" ></i> Phone: +00 151515<br />
                                               <i className="fa fa-envelope" > </i> Email: akitisthgmail.com<br />
                                           </div>            
                                        </Col>
                                        <Col >
                                           <form className="form-contact">
                                               <input className="input" type="text" placeholder="Name" required name="Name" />
                                               <input className="input " type="text" placeholder="Email" required name="Name" />
        
                                                <input className="input1 " type="text" placeholder="Message" required name="Name" /><br/>
                                                <button className="btn btn-success mt-4" type="submit">SEND</button>
                                           </form>
                                        </Col>
                                           
                                      
                                      
                                    </Row>
                                    
                                </Card.Text>
                            </Card.Body>

                    </Card>

                </div>
               
                
            </>
        );
       
    }
}

export default Home;