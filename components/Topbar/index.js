export default function Topbar({ children }) {
  return (
    <>
      <header>{children}</header>
      <style jsx>
        {`
          header {
            align-items: center;
            background: #ffffffcc;
            backdrop-filter: blur(5px);
            border-bottom: 1px solid #eee;
            height: 49px;
            display: flex;
            position: sticky;
            top: 0;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
