import { useState } from 'react';
import {
  useDeleteDataMutation,
  useGetDataByIdQuery,
  useGetDataQuery,
  usePatchingDataMutation,
  usePostDataMutation,
  useUpdateDataMutation,
} from '../redux/services/userApi';

const User = () => {
  const [newUserData, setNewUserData] = useState({
    id: 10,
    name: 'Mahiya Rafa',
    email: 'rafa@gmail.com',
    phone: '123-456',
  });

  const { data, isLoading } = useGetDataQuery();
  const { data: singleUser, isSuccess } = useGetDataByIdQuery(1);
  const [postData, { isLoading: isPostLoading, isError: isPostError, isSuccess: isPostSuccess }] = usePostDataMutation();
  const [updateData, { isLoading: isUpdateLoading, isError: isUpdateError, isSuccess: isUpdateSuccess }] = useUpdateDataMutation();
  const [patchingData, { isLoading: isPatchLoading, isError: isPatchError, isSuccess: isPatchSuccess }] = usePatchingDataMutation();
  const [deleteData, { isLoading: isDeleteLoading, isError: isDeleteError, isSuccess: isDeleteSuccess }] = useDeleteDataMutation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData(newUserData);
  };

  const handleUpdateData = () => {
    const updatedUserData = { ...singleUser, name: 'Updated Name' };
    console.log(updatedUserData);
    updateData(updatedUserData);
  };

  const handlePatchData = () => {
    const patchData = { id: singleUser.id, phone: '987-654' };
    console.log(patchData);
    patchingData(patchData);
  };

  const handleDeleteData = () => {
    deleteData(singleUser.id);
  };

  return (
    <div>
      <p>{isLoading ? 'Loading.....' : data.length}</p>
      <p>Single User: {isSuccess && singleUser.name}</p>

      {/* POST */}
      {isPostLoading && <p>Posting data...</p>}
      {isPostSuccess && <p>Data posted successfully!</p>}
      {isPostError && <p>Error posting data: {postData.error.message}</p>}
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={newUserData.name} onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })} />
        <input type="email" value={newUserData.email} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} />
        <input type="text" value={newUserData.phone} onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })} />
        <button type="submit" disabled={isPostLoading}>
          {isPostLoading ? 'Posting...' : 'Post'}
        </button>
      </form>

      {/* PUT */}
      <button onClick={handleUpdateData} disabled={isUpdateLoading}>
        {isUpdateLoading ? 'Updating...' : 'Update'}
      </button>
      {isUpdateSuccess && <p>Data updated successfully!</p>}
      {isUpdateError && <p>Error updating data: {updateData.error.message}</p>}

      {/* PATCH */}
      <button onClick={handlePatchData} disabled={isPatchLoading}>
        {isPatchLoading ? 'Patching...' : 'Patch'}
      </button>
      {isPatchSuccess && <p>Data patched successfully!</p>}
      {isPatchError && <p>Error patching data: {patchingData.error.message}</p>}

      {/* DELETE */}
      <button onClick={handleDeleteData} disabled={isDeleteLoading}>
        {isDeleteLoading ? 'Deleting...' : 'Delete'}
      </button>
      {isDeleteSuccess && <p>Data deleted successfully!</p>}
      {isDeleteError && <p>Error deleting data: {deleteData.error.message}</p>}
    </div>
  );
};

export default User;
