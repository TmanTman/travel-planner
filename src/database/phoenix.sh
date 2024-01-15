# DIR=$(pwd)
# db_dump=${DIR}/setup_local_db/db.dump

# if [ ! -f "$db_dump" ]; then
#     echo "DB dump path not found, please run 'gateway_dump.sh' first" && exit 1
# fi

psql -U postgres <<EOF

DROP DATABASE IF EXISTS travel;
CREATE DATABASE travel;
\q

EOF

# pg_restore -U postgres --verbose --clean --no-acl -h localhost -d aeroview $db_dump