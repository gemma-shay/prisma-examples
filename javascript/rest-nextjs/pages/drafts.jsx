import Layout from '../components/Layout'
import Post from '../components/Post'
import { getDrafts } from './api/drafts'

const Drafts = props => {
  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {props.drafts.map(post => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const drafts = await getDrafts();
  return {
    // make drafts object serializable
    // https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
    props: { drafts: JSON.parse(JSON.stringify(drafts)) },
  }
}

export default Drafts
