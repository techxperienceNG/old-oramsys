import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const HomeLanding = () => {

  const cards = [
    {
      title: 'Transactions',
      text: 'loremLorem ipsum dolor sit, amet consectetur adipisicing Bookan unknown',
      img1: "./assets/img/figure/figure39.png" ,
      img2: "./assets/img/figure/figure41.png",
      name: "transactions"
    },
    {
      title: 'Products',
      text: 'loremLorem ipsum dolor sit, amet consectetur adipisicing Bookan unknown',
      img1: "./assets/img/figure/figure39.png",
      img2: "./assets/img/figure/figure42.png",
      name: "products"
    },
    {
      title: 'Users',
      text: 'loremLorem ipsum dolor sit, amet consectetur adipisicing Bookan unknown',
      img1: "./assets/img/figure/figure39.png",
      img2: "./assets/img/figure/figure43.png",
      name: "users"
    },
  ]

  const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction)
  const productGetDatas = useSelector(state => state.product.product)
  const getAllUsers = useSelector(state => state.userData.getUserData)

  const getCount = name => {
    switch (name) {
      case 'transactions':
        return getAlltransactionData.length;
      case 'products':
        return productGetDatas.length;
      case 'users':
        return getAllUsers.length; // or the array of users like users.length;
    }
  };
  return (
    <>
        <section className=''>

            <div className='container dash-head'>
                <h1 className='m-4'>Dashboard</h1>
                <div className='row no-gutters'>
                    {
                      cards.map((card, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                        <div className="financo-activities-box1">
                          <div className="item-img-round">
                            <img src={card.img1} alt="figure" height="81" width="81" />
                            <div className="item-img">
                              <img src={card.img2}  alt="figure" height="41" width="45" />
                            </div>
                          </div>
                          <h2 className="heading-title"><a href="/" className="text-decoration-none">{getCount(card.name)} {" "} {card.title}</a>
                          
                          </h2>
                          <p>{card.text}</p>
            
                        </div>
                      </div>
                      ))
                    }
                </div>
            </div>
      </section>
  </>
  )
}

export default HomeLanding