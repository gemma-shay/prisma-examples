import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { getByID } from '../api/post/[id]'

async function publish(id) {
  await fetch(`${location.origin}/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function destroy(id) {
  await fetch(`${location.origin}/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Post = props => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }
  const authorName = props.author ? props.author.name : 'Unknown author'
  return (
    <Layout>
      <div className="page">
        <h2>{title}</h2>
        <small>By {authorName}</small>
        <ReactMarkdown children={props.content} />
        <div className="actions">
          {!props.published && (
            <button onClick={() => publish(props.id)}>Publish</button>
          )}
          <button onClick={() => destroy(props.id)}>Delete</button>
        </div>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const post = await getByID(context.params.id)
  // make posts object serializable
  // https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
  return { props: { ...JSON.parse(JSON.stringify(post)) } }
}

export default Post
