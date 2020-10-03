//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Head from "next/head";
//> Redux
// Basic Redux provider
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBtn, MDBCard, MDBCardBody } from "mdbreact";

//> Redux
// Actions
import {
  incrementCounter,
  decrementCounter,
} from "../redux/actions/authActions";
//> Style
import styles from "../styles/modules/Home.module.scss";
//#endregion

//#region > Page
class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <img
            src="https://avatars1.githubusercontent.com/u/50574311?s=200&v=4"
            alt="Agency Logo"
            className="img-fluid"
          />
          <h1 className={styles.title}>
            Welcome to{" "}
            <a href="https://nextjs.org" target="_blank">
              Next.js
            </a>{" "}
            Redux!
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <MDBCard className="mt-3">
            <MDBCardBody className="text-center">
              <p className="h3-responsive">
                Counter{" "}
                <span className="font-weight-bold">{this.props.counter}</span>
              </p>
              <div>
                <MDBBtn color="elegant" onClick={this.props.decrementCounter}>
                  Decrease
                </MDBBtn>
                <MDBBtn color="elegant" onClick={this.props.incrementCounter}>
                  Increase
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h3>Learn &rarr;</h3>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
              <h3>Examples &rarr;</h3>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h3>Deploy &rarr;</h3>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>
      </div>
    );
  }
}
//#endregion

//#region > Functions
const mapStateToProps = (state) => ({
  counter: state.auth.value,
});

const mapDispatchToProps = {
  incrementCounter: incrementCounter,
  decrementCounter: decrementCounter,
};
//#endregion

//#region > Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
