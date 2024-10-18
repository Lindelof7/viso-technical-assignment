import ReactLoading from 'react-loading';

export function Loader() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ReactLoading type={'spin'} color={'#3498db'} height={'30%'} width={'30%'} />
        </div>
    );
}