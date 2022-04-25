
insert into card (crd_name, crd_description) values('Dark','Dark consumes Forst and Water');
insert into card (crd_name, crd_description) values('Ligth','Ligth destroys Dark and Fire');
insert into card (crd_name, crd_description) values('Forest','Forest absovers Ligth and Water');
insert into card (crd_name, crd_description) values('Water','Water beats Fire and eats Ligth');
insert into card (crd_name, crd_description) values('Fire','Fire burns Forest and lights Dark');

insert into slots (slot_type) values('Monster 1');
insert into slots (slot_type) values('Monster 2');
insert into slots (slot_type) values('Monster 3');
insert into slots (slot_type) values('Monster 4');
insert into slots (slot_type) values('Monster 5');

insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(3,2);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(2,1);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(1,4);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(4,5);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(5,3);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(3,4);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(4,2);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(2,5);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(5,1);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(1,3);

insert into room (roo_name, roo_topcard_id) values('Room 1',1);

insert into player (ply_name,ply_passwd) values ('John','Doe');

commit;
