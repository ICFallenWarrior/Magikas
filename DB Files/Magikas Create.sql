create table player (
        	ply_id serial,
            ply_name VARCHAR(60),
            ply_passwd VARCHAR(60),
            primary key(ply_id)
);
        

create table card (
					crd_id SERIAL not null,
					crd_name VARCHAR(60) not null, 	-- card name
					crd_description VARCHAR(60), 		-- card description (this card wins over ...)
					primary key (crd_id)	
);

create table slots (
					slot_id SERIAL not null,
					slot_type VARCHAR(60) not null, 	-- slot type
					primary key (slot_id)	
);

create table cardwcard (
					cwc_id SERIAL not null,
					cwc_cwins_id INT not null, 		-- this card wins over this other card
					cwc_clooses_id INT not null, 	-- this card looses 
					primary key (cwc_id)	
);

create table room (
					roo_id SERIAL not null,
					roo_name VARCHAR(60) not null, 	-- room name
					roo_topcard_id INT not null, 	-- id of the room top card (the one currently on top)
					primary key (roo_id)	
);

-- Foreign key
-- a restriction that only allow you to insert an id valid, as room's top card
		     		     
alter table room 
add constraint room_fk_card
foreign key (roo_topcard_id) references card(crd_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table cardwcard 
add constraint cardwcard_fk_cardwin
foreign key (cwc_cwins_id) references card(crd_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table cardwcard 
add constraint cardwcard_fk_cardloo
foreign key (cwc_clooses_id) references card(crd_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;

