import { Box, Avatar, Typography, Stack } from "@mui/material";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: params => {
      return (
        <Stack justifyContent="normal">
          <Avatar src={params.row.photoUrl} alt="avatar" />
          <Typography component="span" sx={{ ml: 1 }}>
            {params.row.username}
          </Typography>
        </Stack>
      );
    }
  },
  {
    field: "email",
    headerName: "Email",
    width: 230
  },

  {
    field: "address",
    headerName: "Address",
    width: 100
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: params => {
      return (
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: {
              active: "#B9E9C9",
              pending: "#fbe7a8",
              passive: "#f29c9E"
            }[params.row.status],
            color: {
              active: "success.main",
              pending: "warning.main",
              passive: "error.main"
            }[params.row.status]
          }}
        >
          {params.row.status}
        </Box>
      );
    }
  }
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    photoUrl: "/person1.jpg",
    status: "active",
    email: "1snow@gmail.com",
    age: 35
  },
  {
    id: 2,
    username: "Jamie Lannister",
    photoUrl: "/person2.jpg",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42
  },
  {
    id: 3,
    username: "Lannister",
    photoUrl: "/person3.jpg",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45
  },
  {
    id: 4,
    username: "Stark",
    photoUrl: "/person4.jpg",
    email: "4snow@gmail.com",
    status: "active",
    age: 16
  },
  {
    id: 5,
    username: "Targaryen",
    photoUrl: "/person5.jpg",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22
  },
  {
    id: 6,
    username: "Melisandre",
    photoUrl: "/person1.jpg",
    email: "6snow@gmail.com",
    status: "active",
    age: 15
  },
  {
    id: 7,
    username: "Clifford",
    photoUrl: "/person5.jpg",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44
  },
  {
    id: 8,
    username: "Frances",
    photoUrl: "/person2.jpg",
    email: "8snow@gmail.com",
    status: "active",
    age: 36
  },
  {
    id: 9,
    username: "Roxie",
    photoUrl: "/person4.jpg",
    email: "snow@gmail.com",
    status: "pending",
    age: 65
  },
  {
    id: 10,
    username: "Roxie",
    img:
      "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65
  }
];

export const rows = [
  {
    id: 1143155,
    product: "Acer Nitro 5",
    photoUrl: "/person1.jpg",
    customer: "John Smith",
    date: "1 March",
    amount: 785,
    method: "Cash on Delivery",
    status: "Approved"
  },
  {
    id: 2235235,
    product: "Playstation 5",
    photoUrl: "/person2.jpg",
    customer: "Michael Doe",
    date: "1 March",
    amount: 900,
    method: "Online Payment",
    status: "Pending"
  },
  {
    id: 2342353,
    product: "Redragon S101",
    photoUrl: "/person3.jpg",
    customer: "John Smith",
    date: "1 March",
    amount: 35,
    method: "Cash on Delivery",
    status: "Pending"
  },
  {
    id: 2357741,
    product: "Razer Blade 15",
    photoUrl: "/person4.jpg",
    customer: "Jane Smith",
    date: "1 March",
    amount: 920,
    method: "Online",
    status: "Approved"
  },
  {
    id: 2342355,
    product: "ASUS ROG Strix",
    photoUrl: "/person5.jpg",
    customer: "Harold Carol",
    date: "1 March",
    amount: 2000,
    method: "Online",
    status: "Pending"
  }
];

export const notifiCationData = [
  {
    id: 1,
    image: "/person1.jpg",
    kind: "new-user",
    desc: "You created a new user - Ali Connors",
    body: "I'll be in your neighborhood doing errands this…",
    date: new Date()
  },
  {
    id: 2,
    kind: "debit-transaction",
    desc: "Debit Alert!",
    body: "Your account has been debitted $3...",
    date: new Date()
  },
  {
    id: 3,
    kind: "analytics",
    desc: "Jade analytics",
    body:
      "Jade store - Improved user base by 2%, with a decline in product sales by 5%...",
    date: new Date()
  }
];

export const chatData = [
  {
    id: 1,
    photoUrl: "/person1.jpg",
    user: "Ali kross",
    message: "I'll be in your neighborhood doing errands this…",
    date: new Date()
  },
  {
    id: 2,
    photoUrl: "/person2.jpg",
    user: "Joseph Anikulapo",
    message: "Your account has been debitted $3...",
    date: new Date()
  },
  {
    id: 3,
    photoUrl: "/person3.jpg",
    user: "Seun kuti",
    message:
      "Jade store - Improved user base by 2%, with a decline in product sales by 5%...",
    date: new Date()
  }
];
