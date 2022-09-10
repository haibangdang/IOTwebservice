
-- Lưu ý ssssss là workspace, nếu tạo workspace khác tên thì thay ssssss bằng workspace đã tạo

-- Create schema ssssss before run it (use create station API)

--Add 10 rows to device table in ssssss schema



do $$
declare 
   counter integer := 0;
begin
   while counter < 10 loop
    INSERT INTO ssssss.project (
    "customerId", "salePersonId", "projectName", "createAt", "createBy", "startDate", "city", "district", "ward", "longitude", "latitude", "addressDetail") VALUES (
    '1'::integer, '1'::integer, 'asdasd'::character varying, '1999-01-08 04:05:06+07'::timestamp with time zone, '2'::integer, '1999-01-08 04:05:06+07'::timestamp with time zone, 'HCM'::character varying, 'HCM'::character varying, 'HCM'::character varying, '10.1'::double precision, '99.99'::double precision, 'asdasdasdas'::character varying);
    
    counter := counter + 1;
   end loop;
end$$;

do $$
declare 
   counter integer := 0;
begin
   while counter < 10 loop

    INSERT INTO ssssss.stations (
    "stationName", "createAt", "startDate", "createBy", "phoneNumber", "balance", "expiredDate", "qualityScore", "city", "district", "ward", "longitude", "latitude", "addressDetail", "description") VALUES (
    'Tram Back Khoa'::character varying, '1999-01-08 04:05:06+07'::timestamp with time zone, '1999-01-08 04:05:06+07'::timestamp with time zone, '1'::integer, '0987654321'::character varying, '100000'::character varying, '1999-01-08 04:05:06+07'::timestamp with time zone, '100'::integer, 'HCM'::character varying, '10'::character varying, '1'::character varying, '1.001'::double precision, '10.1'::double precision, 'Ly Thuong Kiet'::character varying, 'asdasdas'::character varying);

    counter := counter + 1;
   end loop;
end$$;

do $$
declare 
   counter integer := 0;
begin
   while counter < 10 loop
    INSERT INTO ssssss.devices (
    "parentId", "status", "protocol", "deviceType", "serialNumber", "createAt", "createBy", "startDate", "endDate", "deleteAt", "deleteBy", "updateAt", "updateBy", "description") VALUES (
    '1'::integer, '1'::integer, '1'::integer, '1'::integer, '1asda'::character varying, '1999-01-08 04:05:06+07'::timestamp with time zone, '1'::integer, '1999-01-08 04:05:06+07'::timestamp with time zone, '1999-01-08 04:05:06+07'::timestamp with time zone, '1999-01-08 04:05:06+07'::timestamp with time zone, '1'::integer, '1999-01-08 04:05:06+07'::timestamp with time zone, '1'::integer, 'adsasd'::character varying);
	 counter := counter + 1;
   end loop;
end$$;

--Add 10 rows to station table in ssssss schema


--Add 10 rows to project table in ssssss schema

