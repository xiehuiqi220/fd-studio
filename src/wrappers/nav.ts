import { history, useModel, useParams } from 'umi';

export default (props: any) => {
  const params = useParams();
  const { initialState } = useModel('@@initialState');

  const pid = initialState?.currentProjectId;
  if (pid) {
    history.replace(history.location.pathname + '/' + pid);
    console.log('自动添加PID并跳转', pid);
  } else {
    alert('please select a project');
    history.back();
  }
};
