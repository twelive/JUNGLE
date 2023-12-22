import useBookmarksData from '@/api/useBookmarksData';
import BookMarkItem from '@components/MyPage/BookMarkItem';


function BookMarkListData() {
  const { data } = useBookmarksData();

  return (
    <>
       {data &&
        data.map((item) => (
          <BookMarkItem
            key={item.stack_digging.id}
            src={`/study/stack/detail/${item.stack_digging.id}`}
            ItemId={item.stack_digging.id}
            title={item.stack_digging.title || undefined}
            author={item.stack_digging.user_email || undefined}
            content={item.stack_digging.text || undefined}
            created={item.stack_digging.created_at}
          />
        ))}
    </>
  )
}

export default BookMarkListData