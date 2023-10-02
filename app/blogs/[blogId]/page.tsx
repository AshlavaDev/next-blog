//TODO: Finish page and make an edit mode and have logged in edit and delete buttons and logged out/ not user author link
import findAuthor from "@/app/actions/findAuthor";
import getBlogById from "@/app/actions/getBlogById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import BlogPage from "@/components/blogs/blogpages/BlogPage";

interface IParams {
  blogId: string;
}


export default async function Blog(
  { params }: { params: IParams }
) {

  function convertData(data: any | null) {
    return {
      ...data,
      createAt: data?.createdAt.toString(),
      updatedAt: data?.updatedAt.toString(),
    }
  }

  const data = convertData(await getBlogById(params));
  let blogAuthor;
  if (data) {
    blogAuthor = convertData(await findAuthor(data.userId));
  }

  const currentUser = await getCurrentUser();

  return (
    <>
      <BlogPage blogData={data} blogAuthor={blogAuthor} currentUser={currentUser} />
    </>
  )
}
