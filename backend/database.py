import psycopg2

def get_connection():
    return  psycopg2.connect(
        host="pgbouncer.causweuhihdqbfpgkqxi.supabase.co",
        port=6543,
        database="postgres",
        user="postgres",
        password="1453Wms1453",  # Supabase şifreni buraya yaz
        sslmode="require"          # Supabase bağlantısı için gerekli
    )
