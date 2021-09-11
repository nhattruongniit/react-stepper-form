import React from 'react';
import Table from '../components/commons/Table';
import CampaignBox from '../components/commons/CampaignBox';
import image1Src from '../assets/static/table-1.png';
import image2Src from '../assets/static/table-2.png';
import image3Src from '../assets/static/table-3.png';
import image4Src from '../assets/static/table-4.png';
import { ReactComponent as FacebookSVG } from '../assets/svg/facebook.svg';
import { ReactComponent as InstagramSVG } from '../assets/svg/instagram.svg';
import { ReactComponent as TwitterSVG } from '../assets/svg/twitter.svg';
import { ReactComponent as youtubeSVG } from '../assets/svg/youtube-play.svg';
import { subDays, addDays, format } from 'date-fns';

export default {
  title: 'Share Comp/Table',
  component: Table,
  argTypes: {},
};
const iconMapping = {
  facebook: FacebookSVG,
  instagram: InstagramSVG,
  twitter: TwitterSVG,
  youtube: youtubeSVG,
};

const columnSeed = [
  {
    Header: 'Campaign',
    accessor: (d) => d,
    Cell: ({ cell }) => {
      const rowData = cell.value;
      return (
        <CampaignBox
          image={rowData.thumbnail}
          title={rowData.title}
          startTime={rowData.status.start}
          endTime={rowData.status.now}
        />
      );
    },
  },
  {
    Header: 'Kols Applied:',
    accessor: (data) => data.kols.applied,
  },
  {
    Header: 'Kols Accepted:',
    accessor: (data) => data.kols.accepted,
  },
  {
    Header: 'Platforms',
    accessor: 'platforms',
    Cell: ({ cell }) => {
      const cellData = cell.value || [];
      return (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          {cellData.map((d, idx) => {
            const Icon = iconMapping[d];
            return (
              <span key={idx} style={{ marginLeft: '5px' }}>
                <Icon width="10px" height="10px" />
              </span>
            );
          })}
        </div>
      );
    },
  },
  {
    Header: 'End Date',
    accessor: 'endTime',
    Cell: ({ cell }) => {
      const cellData = cell.value || '';
      return format(cellData, 'do MMMM, yy');
    },
  },
  {
    Header: 'Budget',
    accessor: 'budget',
  },
  {
    Header: 'Status',
    accessor: 'status.label',
  },
];

const dataSeed = [
  {
    id: 1,
    title: 'Choose Phenomenal',
    thumbnail: image1Src,
    kols: {
      applied: 23,
      accepted: 23,
    },
    platforms: ['facebook', 'instagram', 'youtube', 'twitter'],
    progress: 53,
    endTime: addDays(new Date(), 5).getTime(),
    budget: '$ 2,200',
    status: {
      start: subDays(new Date(), '14').getTime(),
      now: new Date().getTime(),
      label: 'Running',
    },
  },
  {
    id: 2,
    title: 'A Perfect Serve',
    thumbnail: image2Src,
    kols: {
      applied: 23,
      accepted: 23,
    },
    platforms: ['facebook', 'instagram', 'youtube', 'twitter'],
    progress: 53,
    endTime: addDays(new Date(), 5).getTime(),
    budget: '$ 2,500',
    status: {
      start: subDays(new Date(), '12').getTime(),
      now: new Date().getTime(),
      label: 'Running',
    },
  },
  {
    id: 3,
    title: 'Email Design with XD',
    thumbnail: image4Src,
    kols: {
      applied: 23,
      accepted: 23,
    },
    platforms: ['facebook', 'instagram', 'youtube', 'twitter'],
    progress: 53,
    endTime: addDays(new Date(), 1).getTime(),
    budget: '$ 2,500',
    status: {
      start: subDays(new Date(), '15').getTime(),
      now: new Date().getTime(),
      label: 'Running',
    },
  },
  {
    id: 4,
    title: 'Game Ready starts with Gamers',
    thumbnail: image3Src,
    kols: {
      applied: 23,
      accepted: 23,
    },
    platforms: ['facebook', 'instagram', 'youtube', 'twitter'],
    progress: 53,
    endTime: addDays(new Date(), 2).getTime(),
    budget: '$ 1,200',
    status: {
      start: subDays(new Date(), '11').getTime(),
      now: new Date().getTime(),
      label: 'Running',
    },
  },
];

const Template = (args) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const columns = React.useMemo(() => columnSeed, []);
  const data = dataSeed;
  React.useEffect(() => {
    setTimeout(() => {
      setRowsPerPage(4);
    }, 2000);
  });
  return <Table data={data} columns={columns} rowsPerPageOptions={[2, 3, 4, 5]} rowsPerPage={rowsPerPage} {...args} />;
};

const TemplateWithAPI = (args) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalRecord] = React.useState(100);

  const columns = React.useMemo(() => columnSeed, []);
  const data = dataSeed;

  const handleChangePerPage = (newPerPage) => {
    // do something with API here
    setRowsPerPage(newPerPage);
    setPage(0);
  };

  const handleChangePage = (newPage) => {
    // do something with API here
    setPage(newPage);
  };

  const totalPage = React.useMemo(() => {
    return Math.ceil(totalRecord / rowsPerPage);
  }, [totalRecord, rowsPerPage]);

  return (
    <Table
      data={data}
      columns={columns}
      rowsPerPageOptions={[5, 10, 25, 45]}
      rowsPerPage={rowsPerPage}
      onPerPageChange={handleChangePerPage}
      onPageChange={handleChangePage}
      page={page}
      totalPage={totalPage}
      totalRecord={totalRecord}
    />
  );
};

const TemplateCustomStyle = (args) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Header red',
        accessor: (data) => data.kols.applied,
        headerStyle: { color: 'red' },
      },
      {
        Header: 'Kols Accepted:',
        accessor: (data) => data.kols.accepted,
      },
      {
        Header: 'Platforms',
        accessor: 'platforms',
        Cell: ({ cell }) => {
          const cellData = cell.value || [];
          return (
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
              {cellData.map((d, idx) => {
                const Icon = iconMapping[d];
                return (
                  <span key={idx} style={{ marginLeft: '5px' }}>
                    <Icon width="10px" height="10px" />
                  </span>
                );
              })}
            </div>
          );
        },
      },
      {
        Header: 'End Date',
        accessor: 'endTime',
        Cell: ({ cell }) => {
          const cellData = cell.value || '';
          return format(cellData, 'do MMMM, yy');
        },
      },
      {
        Header: 'Change props with condition',
        accessor: 'budget',
        getProps: (data) => {
          if (data.value === '$ 1,200') {
            return {
              style: { color: 'red', fontWeight: 'bold', cursor: 'pointer' },
              title: 'click here',
              onClick: () => {
                alert(data.value);
              },
            };
          }
          return {};
        },
      },
      {
        Header: 'Status',
        accessor: 'status.label',
      },
    ],
    [],
  );
  const data = dataSeed;

  return (
    <Table
      data={data}
      columns={columns}
      isHiddenPagination={true}
      getCellProps={() => {
        return {
          title: 'U can custom anything, if u want',
          style: { color: 'blue' },
        };
      }}
    />
  );
};

export const TableComponentWithLocalPagination = Template.bind({});
TableComponentWithLocalPagination.args = {};

export const TableComponentWithAPI = TemplateWithAPI.bind({});
TableComponentWithAPI.args = {};

export const TableComponentCustomStyle = TemplateCustomStyle.bind({});
TableComponentWithAPI.args = {};
