drop table if exists complaint;
drop table if exists department;
drop table if exists student;
drop table if exists server;

create table if not exists department(
    deptId text primary key not null,
    name text not null,
    rating float default 0,
    password text not null,
    complaintsHandled int default 0,
    server_id int default 1 
);

create table if not exists server(
    id int primary key not null,
    name text not null,
    ip text not null,
    port int not null
);

create table if not exists student(
    username text primary key not null,
    name text not null,
    email text not null,
    password text not null,
    phoneNo text not null,
    server_id int references server(id)
);

create table if not exists complaint(
    complaintId text primary key not null,
    title text not null,
    description text not null,
    status text default 'pending',
    date_submited date not null,
    feedback text default '',
    stars int default -1,
    deptId text references department(deptId),
    userId text references student(username),
    server_id int references server(id)
);
