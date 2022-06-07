
insert into card (crd_id, crd_name, crd_description) values(1,'Dark','Rock crushes Scissors and Lizard');
insert into card (crd_id, crd_name, crd_description) values(2,'Light','Light lights up the Dark and shines brighter than Fire');
insert into card (crd_id, crd_name, crd_description) values(3,'Forest','Forest overruns Water and thrives with Light');
insert into card (crd_id, crd_name, crd_description) values(4,'Water','Water puts out Fire and drowns out Light');
insert into card (crd_id, crd_name, crd_description) values(5,'Fire','Fire burns Forest and illuminates Lark');
insert into card (crd_id, crd_name, crd_description) values(6,'Health Potion', 'Heal two HP to your other cards');
insert into card (crd_id, crd_name, crd_description) values(7,'Grenade', 'Damage two HP to your opponent cards');
insert into card (crd_id, crd_name, crd_description) values(8,'Enrage', 'Transform your Elementals into raging bersekers');
insert into card (crd_id, crd_name, crd_description) values(9,'Polymorph', 'Transform your opponent Elementals into vermin');
insert into card (crd_id, crd_name, crd_description) values(10,'Berserker', 'A raging berserker');
insert into card (crd_id, crd_name, crd_description) values(11,'Vermin', 'A weak, pathetic creature');

insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(3,2);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(2,1);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(1,4);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(4,5);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(5,3);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(3,4);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(4,2);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(2,5);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(5,1);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(10,1);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(10,2);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(10,3);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(10,4);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(10,5);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(10,11);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(1,11);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(2,11);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(3,11);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(4,11);
insert into cardwcard (cwc_cwins_id, cwc_clooses_id) values(5,11);

insert into player (ply_name,ply_passwd) values ('John','Doe');
insert into player (ply_name,ply_passwd) values ('Mary','Jane');

insert into match (mt_turn,mt_finished) values (0,false);

insert into pmstate (pms_name) values ('PlayCard');
insert into pmstate (pms_name) values ('Attack');
insert into pmstate (pms_name) values ('Endturn');
insert into pmstate (pms_name) values ('Wait');

insert into playermatch (pm_player_id,pm_match_id,pm_state_id,pm_hp) values (1,1,1,3);
insert into playermatch (pm_player_id,pm_match_id,pm_state_id,pm_hp) values (2,1,4,3);

insert into cardpos (cp_name) values ('Hand');
insert into cardpos (cp_name) values ('Table');
insert into cardpos (cp_name) values ('TablePlayed');

insert into deck (deck_pm_id,deck_pos_id,deck_card_id,deck_card_hp) values (1,1,1,4);
insert into deck (deck_pm_id,deck_pos_id,deck_card_id,deck_card_hp) values (1,1,3,4);
insert into deck (deck_pm_id,deck_pos_id,deck_card_id,deck_card_hp) values (1,1,1,4);
insert into deck (deck_pm_id,deck_pos_id,deck_card_id,deck_card_hp) values (2,1,2,4);
insert into deck (deck_pm_id,deck_pos_id,deck_card_id,deck_card_hp) values (2,1,5,4);
insert into deck (deck_pm_id,deck_pos_id,deck_card_id,deck_card_hp) values (2,1,3,4);



commit;
